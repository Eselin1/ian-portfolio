import { useEffect, useState } from "react";
import { activityLabels } from "./recommendations";
import { todayKey } from "./storage";
import { activityFromWhoop, isWhoopWorkout, type WhoopWorkout } from "./whoop";
import type { ActivityLog, AppState } from "./types";

type Connection = { configured: boolean; connected: boolean };
async function api<T>(action: string, method = "GET"): Promise<T> {
  const response = await fetch(`/api/whoop/${action}`, { method, credentials: "same-origin", cache: "no-store", signal: AbortSignal.timeout(30000) });
  if (!response.headers.get("Content-Type")?.includes("application/json")) throw new Error("WHOOP linking will be available after the server setup is deployed.");
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "WHOOP could not complete that request.");
  return data as T;
}
export function WhoopPanel({ state, onReview }: { state: AppState; onReview: (activity: ActivityLog) => void }) {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [workouts, setWorkouts] = useState<WhoopWorkout[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [targets, setTargets] = useState<Record<string, string>>({});
  const [notice] = useState(() => {
    const result = new URLSearchParams(window.location.search).get("whoop");
    return result === "connected" ? "WHOOP connected. Fetch recent workouts to review them." : result ? "WHOOP was not connected. Try connecting again." : "";
  });
  useEffect(() => {
    let active = true;
    api<Connection>("status").then((value) => { if (active) setConnection(value); }).catch((reason: Error) => { if (active) setError(reason.message); });
    const url = new URL(window.location.href);
    if (url.searchParams.has("whoop")) { url.searchParams.delete("whoop"); window.history.replaceState(null, "", url); }
    return () => { active = false; };
  }, []);
  async function fetchWorkouts() {
    setBusy(true); setError("");
    try {
      const data = await api<{ records: unknown[] }>("workouts", "POST");
      if (!Array.isArray(data.records)) throw new Error("WHOOP returned an unexpected response.");
      setWorkouts(data.records.filter(isWhoopWorkout)); setLoaded(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not fetch WHOOP workouts."); }
    finally { setBusy(false); }
  }
  async function disconnect() {
    setBusy(true); setError("");
    try {
      await api("disconnect", "POST");
      setConnection({ configured: true, connected: false }); setWorkouts([]); setLoaded(false);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not disconnect WHOOP."); }
    finally { setBusy(false); }
  }
  return <article className="plain-panel whoop-panel">
    <div className="section-head"><div><p className="eyebrow">Wearables</p><h2>WHOOP</h2></div><span>{connection?.connected ? "Connected" : "Not connected"}</span></div>
    <p>Bring in duration, heart rate, calories, distance, and strain from the last 30 days. Review activity type, effort, and leg feel before saving.</p>
    {notice ? <p role="status">{notice}</p> : null}
    {error ? <p role="alert">{error}</p> : null}
    {connection?.configured ? <div className="backup-actions">
      <a className="secondary-btn" href="/api/whoop/connect">{connection.connected ? "Reconnect WHOOP" : "Connect WHOOP"}</a>
      {connection.connected ? <><button type="button" disabled={busy} onClick={fetchWorkouts}>{busy ? "Please wait…" : "Fetch Recent Workouts"}</button><button type="button" disabled={busy} onClick={disconnect}>Disconnect</button></> : null}
    </div> : connection ? <p>WHOOP setup is pending. You can enter your WHOOP summary in the activity form below.</p> : null}
    {loaded && !workouts.length ? <p>No scored workouts found in the last 30 days. WHOOP may still be processing a recent session.</p> : null}
    <div className="stack">{workouts.map((workout) => {
      const imported = state.activities.some((activity) => activity.whoopWorkoutId === workout.id || activity.id === `whoop-${workout.id}`);
      const dateKey = todayKey(new Date(workout.start));
      const sameDay = state.activities.filter((activity) => todayKey(new Date(activity.date)) === dateKey);
      const gymLogged = state.workouts.some((log) => todayKey(new Date(log.date)) === dateKey);
      return <div className="whoop-workout" key={workout.id}>
        <strong>{workout.sport_name ?? "Workout"} · {new Date(workout.start).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</strong>
        {imported ? <p>Already saved in PitchForm.</p> : <>
          {gymLogged ? <p>A gym workout is already logged on this date. Import only if this is a separate activity.</p> : null}
          {sameDay.length ? <label>Save to<select value={targets[workout.id] ?? ""} onChange={(event) => setTargets((current) => ({ ...current, [workout.id]: event.target.value }))}><option value="">New activity</option>{sameDay.map((activity) => <option key={activity.id} value={activity.id}>Update {activityLabels[activity.activityType]} · {new Date(activity.date).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</option>)}</select></label> : null}
          <button className="secondary-btn" type="button" onClick={() => onReview(activityFromWhoop(workout, state, sameDay.find((activity) => activity.id === targets[workout.id])))}>Review Activity</button>
        </>}
      </div>;
    })}</div>
    <p>Disconnecting stops access. Activities you have saved remain in PitchForm.</p>
  </article>;
}
