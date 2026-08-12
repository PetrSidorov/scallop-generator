import { describe, expect, it } from "vitest";
import { DEFAULT_STATE } from "./constants";
import { reducer } from "./reducer";
import { mirrorToVertical } from "./utils";

describe("mirrorToVertical", () => {
  it("mirrors horizontal edge values to vertical values", () => {
    const vars = {
      ...DEFAULT_STATE.vars,
      horizontal_radius: 13,
      horizontal_gap: 7,
    };

    const result = mirrorToVertical(vars);

    expect(result.vertical_radius).toBe(13);
    expect(result.vertical_gap).toBe(7);
  });

  it("preserves unrelated values", () => {
    const vars = {
      ...DEFAULT_STATE.vars,
      top_left_corner: 21,
      scallop_color: "#abcdef",
    };

    const result = mirrorToVertical(vars);

    expect(result.top_left_corner).toBe(21);
    expect(result.scallop_color).toBe("#abcdef");
  });
});

describe("reducer", () => {
  it("sets a variable", () => {
    const state = {
      ...DEFAULT_STATE,
      syncEdges: false,
    };

    const result = reducer(state, {
      type: "SET_VAR",
      key: "horizontal_radius",
      val: 14,
    });

    expect(result.vars.horizontal_radius).toBe(14);
  });

  it("mirrors horizontal values while edge sync is enabled", () => {
    const result = reducer(DEFAULT_STATE, {
      type: "SET_VAR",
      key: "horizontal_radius",
      val: 18,
    });

    expect(result.vars.horizontal_radius).toBe(18);
    expect(result.vars.vertical_radius).toBe(18);
  });

  it("does not mirror horizontal values while edge sync is disabled", () => {
    const state = {
      ...DEFAULT_STATE,
      syncEdges: false,
      vars: {
        ...DEFAULT_STATE.vars,
        vertical_radius: 4,
      },
    };

    const result = reducer(state, {
      type: "SET_VAR",
      key: "horizontal_radius",
      val: 18,
    });

    expect(result.vars.horizontal_radius).toBe(18);
    expect(result.vars.vertical_radius).toBe(4);
  });

  it("mirrors horizontal values when edge sync is enabled", () => {
    const state = {
      ...DEFAULT_STATE,
      syncEdges: false,
      vars: {
        ...DEFAULT_STATE.vars,
        horizontal_radius: 19,
        horizontal_gap: 8,
        vertical_radius: 3,
        vertical_gap: 1,
      },
    };

    const result = reducer(state, { type: "TOGGLE_SYNC_EDGES" });

    expect(result.syncEdges).toBe(true);
    expect(result.vars.vertical_radius).toBe(19);
    expect(result.vars.vertical_gap).toBe(8);
  });

  it("updates scallop color with frame color while color sync is enabled", () => {
    const result = reducer(DEFAULT_STATE, {
      type: "SET_FRAME_COLOR",
      color: "#123456",
    });

    expect(result.frameColor).toBe("#123456");
    expect(result.vars.scallop_color).toBe("#123456");
  });

  it("keeps scallop color unchanged when frame color changes while unsynced", () => {
    const state = {
      ...DEFAULT_STATE,
      synced: false,
      vars: {
        ...DEFAULT_STATE.vars,
        scallop_color: "#abcdef",
      },
    };

    const result = reducer(state, {
      type: "SET_FRAME_COLOR",
      color: "#123456",
    });

    expect(result.frameColor).toBe("#123456");
    expect(result.vars.scallop_color).toBe("#abcdef");
  });

  it("copies frame color to scallop color when color sync is enabled", () => {
    const state = {
      ...DEFAULT_STATE,
      synced: false,
      frameColor: "#112233",
      vars: {
        ...DEFAULT_STATE.vars,
        scallop_color: "#abcdef",
      },
    };

    const result = reducer(state, { type: "TOGGLE_SYNC" });

    expect(result.synced).toBe(true);
    expect(result.vars.scallop_color).toBe("#112233");
  });

  it("toggles only the requested edge", () => {
    const result = reducer(DEFAULT_STATE, {
      type: "TOGGLE_EDGE",
      edge: "left",
    });

    expect(result.activeEdges).toEqual({
      top: true,
      right: true,
      bottom: true,
      left: false,
    });
  });

  it("resets to the default state", () => {
    const changed = {
      ...DEFAULT_STATE,
      frameColor: "#ffffff",
      vars: {
        ...DEFAULT_STATE.vars,
        horizontal_radius: 30,
      },
    };

    expect(reducer(changed, { type: "RESET" })).toEqual(DEFAULT_STATE);
  });
});
