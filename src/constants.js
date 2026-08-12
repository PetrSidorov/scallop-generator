export const DEFAULT_FRAME_COLOR = "#000000";

const DEFAULT_VARS = {
  scallop_color: "#f3dde9",
  cut_depth: 1.2,
  ellipse_ratio: 1.2,
  horizontal_radius: 6,
  horizontal_gap: 6,
  vertical_radius: 4,
  vertical_gap: 2,
  top_left_corner: 10,
  bottom_left_corner: 10,
  top_right_corner: 10,
  bottom_right_corner: 10,
};

export const DEFAULT_STATE = {
  vars: DEFAULT_VARS,
  frameColor: DEFAULT_FRAME_COLOR,
  synced: true,
  syncEdges: true,
  activeEdges: { top: true, right: true, bottom: true, left: true },
};

export const H_TO_V = {
  horizontal_radius: "vertical_radius",
  horizontal_gap: "vertical_gap",
};

export const EDGES = ["top", "right", "bottom", "left"];

export const SLIDERS = [
  {
    group: "Global",
    key: "global",
    color: "#ff79c6",
    items: [
      { key: "cut_depth", label: "Cut Depth", min: 0.3, max: 2.5, step: 0.05 },
      {
        key: "ellipse_ratio",
        label: "Ellipse Ratio",
        min: 0.3,
        max: 2.5,
        step: 0.05,
      },
    ],
  },
  {
    group: "Horizontal Edges",
    key: "horizontal",
    color: "#bd93f9",
    items: [
      { key: "horizontal_radius", label: "Radius", min: 2, max: 40, step: 1 },
      { key: "horizontal_gap", label: "Gap", min: 0, max: 40, step: 1 },
      // {
      //   key: "horizontal_start",
      //   label: "Start Offset",
      //   min: 0,
      //   max: 80,
      //   step: 1,
      // },
      // { key: "horizontal_end", label: "End Offset", min: 0, max: 80, step: 1 },
    ],
  },
  {
    group: "Vertical Edges",
    key: "vertical",
    color: "#8be9fd",
    items: [
      { key: "vertical_radius", label: "Radius", min: 2, max: 40, step: 1 },
      { key: "vertical_gap", label: "Gap", min: 0, max: 40, step: 1 },
      // {
      //   key: "vertical_start",
      //   label: "Start Offset",
      //   min: 0,
      //   max: 80,
      //   step: 1,
      // },
      // { key: "vertical_end", label: "End Offset", min: 0, max: 80, step: 1 },
    ],
  },
  {
    group: "Corners",
    key: "corners",
    color: "#8be9fd",
    items: [
      {
        key: "top_left_corner",
        label: "Top left corner",
        min: 5,
        max: 40,
        step: 1,
      },
      {
        key: "bottom_left_corner",
        label: "Bottom left corner",
        min: 5,
        max: 40,
        step: 1,
      },
      {
        key: "top_right_corner",
        label: "Top right corner",
        min: 5,
        max: 40,
        step: 1,
      },
      {
        key: "bottom_right_corner",
        label: "Bottom right corner",
        min: 5,
        max: 40,
        step: 1,
      },
    ],
  },
];

// top_left_corner: 2,
// bottom_left_corner: 2,
// top_right_corner: 2,
// bottom_right_corner: 2,
