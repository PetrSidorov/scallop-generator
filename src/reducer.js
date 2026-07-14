import { mirrorToVertical } from "./utils";
import { DEFAULT_STATE } from "./constants";
export function reducer(state, action) {
  switch (action.type) {
    case "SET_VAR": {
      const { key, val } = action;
      const updated = { ...state.vars, [key]: val };
      return {
        ...state,
        vars: state.syncEdges ? mirrorToVertical(updated) : updated,
      };
    }

    case "SET_FRAME_COLOR": {
      const frameColor = action.color;
      const vars = state.synced
        ? { ...state.vars, scallop_color: frameColor }
        : state.vars;
      return { ...state, frameColor, vars };
    }

    case "SET_SCALLOP_COLOR":
      return { ...state, vars: { ...state.vars, scallop_color: action.color } };

    case "TOGGLE_SYNC": {
      const synced = !state.synced;
      const vars = synced
        ? { ...state.vars, scallop_color: state.frameColor }
        : state.vars;
      return { ...state, synced, vars };
    }

    case "TOGGLE_SYNC_EDGES": {
      const syncEdges = !state.syncEdges;
      return {
        ...state,
        syncEdges,
        vars: syncEdges ? mirrorToVertical(state.vars) : state.vars,
      };
    }

    case "TOGGLE_EDGE": {
      return {
        ...state,
        activeEdges: {
          ...state.activeEdges,
          [action.edge]: !state.activeEdges[action.edge],
        },
      };
    }

    case "RESET":
      return DEFAULT_STATE;

    default:
      return state;
  }
}
