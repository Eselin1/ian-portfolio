import { defaultState } from './storage';
import { getMovements, getSessionVariant } from './program';
import type { AppState, SessionId, WorkoutLog } from './types';

export function makeDemoState(): AppState {
  const date = (daysAgo: number) => {
    const value = new Date();
    value.setDate(value.getDate() - daysAgo);
    value.setHours(17, 30, 0, 0);
    return value.toISOString();
  };
  const workouts: WorkoutLog[] = [
    ['lower-a', 12], ['upper-a', 10], ['lower-b', 8], ['upper-b', 6], ['lower-a', 4], ['upper-a', 2],
  ].map(([id, daysAgo], index) => {
    const session = getSessionVariant(id as SessionId, 'full');
    return {
      id: `demo-workout-${index}`, sessionId: session.id, sessionTitle: session.title,
      variant: 'full', date: date(Number(daysAgo)), rating: 'moderate', notes: 'Sample session — completed with steady form.',
      exercises: session.exercises.map(exercise => ({ id: exercise.id, name: exercise.name, movements: getMovements(exercise).map(({ id, name, unit }) => ({ id, name, unit })) })),
      sets: Object.fromEntries(session.exercises.map(exercise => [exercise.id, Array.from({ length: exercise.sets }, () => ({
        done: true, movements: Object.fromEntries(getMovements(exercise).map(movement => [movement.id, {
          reps: movement.reps.match(/\d+/)?.[0] ?? '8', weight: movement.defaultWeight ? String(movement.defaultWeight) : '',
        }])),
      }))])),
    };
  });
  return {
    ...structuredClone(defaultState), workouts, settings: { timerAlerts: false },
    activities: [
      { id: 'demo-practice', date: date(3), activityType: 'team_practice', durationMinutes: '75', effort: 'moderate', legs: 'normal', averageHeartRate: '138', maximumHeartRate: '172', activeCalories: '540', distanceMiles: '3.2', notes: 'Sample data: passing drills and small-sided games.' },
      { id: 'demo-match', date: date(7), activityType: 'match', durationMinutes: '90', effort: 'hard', legs: 'heavy', averageHeartRate: '151', maximumHeartRate: '181', activeCalories: '780', distanceMiles: '5.4', notes: 'Sample data: weekend match.' },
    ],
  };
}
