import assert from "node:assert/strict";
import { test } from "node:test";

import { screenFor } from "../src/screen.js";

function snapshot(overrides = {}) {
  return {
    match_id: "m1",
    runs: 10,
    wickets: 1,
    overs: "2.3",
    last_event: {
      display: "DOT",
      runs_added: 0,
      wicket_counted: false,
      legal_delivery: true,
      ...overrides.last_event,
    },
    ...overrides,
  };
}

test("counted wicket shows wicket banner", () => {
  assert.deepEqual(
    screenFor(
      snapshot({
        last_event: {
          display: "WICKET",
          runs_added: 0,
          wicket_counted: true,
          legal_delivery: true,
        },
      })
    ),
    { line: "10/1 (2.3)", banner: "wicket" }
  );
});

test("match pack without umpire flag shows wicket banner", () => {
  assert.equal(
    screenFor(
      snapshot({
        wickets: 0,
        last_event: {
          display: "NOT_OUT",
          runs_added: 0,
          wicket_counted: false,
          legal_delivery: true,
        },
        match: {
          innings: {
            latest_over: {
              latest_delivery: { wicket: { kind: "lbw" } },
            },
          },
        },
      })
    ).banner,
    "wicket"
  );
});
