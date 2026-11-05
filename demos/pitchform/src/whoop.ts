import type { ActivityLog, AppState } from "./types";
import { getWeekPlan } from "./recommendations";

export type WhoopWorkout = {
  id: string;
  start: string;
  end: string;
  sport_name?: string;
  score_state: string;
  score?: { average_heart_rate?: number; max_heart_rate?: number; kilojoule?: number; distance_meter?: number; strain?: number };
};
export function isWhoopWorkout(value: unknown): value is WhoopWorkout {
  if (!value || typeof value !== "object") return false;
  const workout = value as Partial<WhoopWorkout>;
  return typeof workout.id === "string" && typeof workout.start === "string" && typeof workout.end === "string" &&
    Number.isFinite(Date.parse(workout.start)) && Date.parse(workout.end) > Date.parse(workout.start) && workout.score_state === "SCORED" &&
    !!workout.score && typeof workout.score === "object";
}
const metric = (value: number | undefined, divisor = 1, digits = 0) => typeof value === "number" && Number.isFinite(value) && value >= 0 ? (value / divisor).toFixed(digits) : "";
export function activityFromWhoop(workout: WhoopWorkout, state: AppState, existing?: ActivityLog): ActivityLog {
  const date = new Date(workout.start);
  const plan = getWeekPlan(state, date);
  const soccer = /soccer|football/i.test(workout.sport_name ?? "");
  const type = soccer ? date.getDay() === plan.gameDay ? "match" : date.getDay() === plan.technicalDay ? "technical" : "team_practice" : "conditioning";
  const strain = metric(workout.score?.strain, 1, 1);
  const source = `WHOOP${strain ? ` strain ${strain}` : ""}.`;
  return {
    id: existing?.id ?? `whoop-${workout.id}`,
    date: existing?.date ?? workout.start,
    activityType: existing?.activityType ?? type,
    durationMinutes: metric((Date.parse(workout.end) - Date.parse(workout.start)) / 60000),
    effort: existing?.effort ?? "moderate",
    legs: existing?.legs ?? "normal",
    averageHeartRate: metric(workout.score?.average_heart_rate),
    maximumHeartRate: metric(workout.score?.max_heart_rate),
    activeCalories: metric(workout.score?.kilojoule, 4.184),
    distanceMiles: metric(workout.score?.distance_meter, 1609.344, 2),
    notes: [existing?.notes, source].filter(Boolean).join("\n"),
    whoopWorkoutId: workout.id,
  };
}
