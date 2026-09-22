/**
 * Scorecard from last_event only. Gateway already stripped protocol leaks.
 *
 * @param {import("./snapshot.js").ScoreSnapshot} snapshot
 * @returns {{ line: string, banner: "wicket" | "not-out" | "boundary" | "runs" }}
 */
export function screenFor(snapshot) {
  const event = snapshot.last_event;
  const line = `${snapshot.runs}/${snapshot.wickets} (${snapshot.overs})`;
  const delivery = snapshot.match?.innings?.latest_over?.latest_delivery;
  if (delivery?.wicket?.kind && delivery.wicket.kind !== "none") {
    if (delivery.wicket.umpire_confirmed !== false) {
      return { line, banner: "wicket" };
    }
  }
  if (event.wicket_counted || event.display === "WICKET") {
    return { line, banner: "wicket" };
  }
  if (event.display === "NOT_OUT") {
    return { line, banner: "not-out" };
  }
  if (event.display === "FOUR" || event.display === "SIX") {
    return { line, banner: "boundary" };
  }
  return { line, banner: "runs" };
}
