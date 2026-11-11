import { getMovements } from "./program";
import type { AppState, SessionId, Variant, Exercise } from "./types";

export function latestMovementSuggestion(state: AppState, sessionId: SessionId, exerciseId: string, movementId: string, setIndex: number) {
  const latest = [...state.workouts].sort((a, b) => b.date.localeCompare(a.date)).find((log) =>
    log.sessionId === sessionId && log.variant === "full" && log.sets[exerciseId]?.some((set) => set.done && set.movements?.[movementId])
  );
  const sets = latest?.sets[exerciseId];
  const exact = sets?.[setIndex];
  if (exact?.done && exact.movements?.[movementId]) return exact.movements[movementId];
  return sets?.find((set) => set.done && set.movements?.[movementId])?.movements[movementId];
}

export function progressionGuidance(state: AppState, sessionId: SessionId, variant: Variant, exercise: Exercise) {
  if (variant !== "full") return ["Progression paused today. Match the target cleanly and keep fatigue low."];
  const latestFull = [...state.workouts].sort((a, b) => b.date.localeCompare(a.date)).find((log) => log.sessionId === sessionId && log.variant === "full");
  if (!latestFull) return ["First full log for this session. Use the target, leave 1-2 reps in reserve, then progress next time."];

  const guidance = getMovements(exercise).map((movement) => {
    const completedSets = (latestFull.sets[exercise.id] ?? []).filter((set) => set.done && set.movements?.[movement.id]);
    if (completedSets.length < exercise.sets) return `${movement.name}: repeat the listed target until you have a complete full-session log.`;

    const logs = completedSets.map((set) => set.movements[movement.id]);
    const repValues = logs.map((log) => firstNumber(log.reps)).filter((value): value is number => value !== null);
    const weightValues = logs.map((log) => firstNumber(log.weight)).filter((value): value is number => value !== null);
    if (movement.unit === "time") return `${movement.name}: repeat the prescribed duration with control.`;
    if (repValues.length !== completedSets.length || (movement.unit === "lb" && weightValues.length !== completedSets.length)) return `${movement.name}: record reps and weight for every completed set before progressing.`;
    if (movement.unit === "lb" && new Set(weightValues).size > 1) return `${movement.name}: repeat your logged weights and complete the target reps consistently.`;
    const lowestReps = repValues.length ? Math.min(...repValues) : null;
    const latestWeight = weightValues.length ? weightValues[0] : null;
    const range = repRange(movement.reps);

    if (latestFull.rating === "very_hard") return `${movement.name}: repeat or reduce next time; last full session was very hard.`;
    if (latestFull.rating === "hard") return `${movement.name}: repeat ${formatPrescription(latestWeight, lowestReps)} and make it cleaner.`;

    if (range && lowestReps !== null && lowestReps < range.max) {
      return `${movement.name}: try ${formatPrescription(latestWeight, lowestReps + 1)}.`;
    }

    if (movement.unit === "lb" && latestWeight !== null) {
      const nextWeight = latestWeight + weightIncrement(movement.name);
      return `${movement.name}: try ${formatPrescription(nextWeight, range?.min ?? lowestReps)}.`;
    }

    if (lowestReps !== null) return `${movement.name}: try ${lowestReps + 1} clean reps.`;
    return `${movement.name}: repeat the last full target with better control.`;
  });

  return guidance.slice(0, 3);
}

export function firstNumber(value?: string) {
  const match = value?.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function repRange(value: string) {
  const match = value.match(/(\d+)(?:-(\d+))?/);
  if (!match) return null;
  const min = Number(match[1]);
  const max = Number(match[2] ?? match[1]);
  return Number.isFinite(min) && Number.isFinite(max) ? { min, max } : null;
}

function weightIncrement(name: string) {
  return /raise|curl|woodchop/i.test(name) ? 2.5 : 5;
}

function formatPrescription(weight: number | null, reps: number | null) {
  const weightText = weight !== null ? `${weight} lb` : "bodyweight";
  const repText = reps !== null ? `x ${reps}` : "for the target reps";
  return `${weightText} ${repText}`;
}
