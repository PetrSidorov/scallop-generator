export const DEFAULT_FRAME_COLOR = "#000000";

export type Edge = "top" | "right" | "bottom" | "left";

export interface ScallopVars {
  scallop_color: string;
  cut_depth: number;
  ellipse_ratio: number;
  horizontal_radius: number;
  horizontal_gap: number;
  vertical_radius: number;
  vertical_gap: number;
  top_left_corner: number;
  bottom_left_corner: number;
  top_right_corner: number;
  bottom_right_corner: number;
}

export interface ScallopState {
  vars: ScallopVars;
  frameColor: string;
  synced: boolean;
  syncEdges: boolean;
  activeEdges: Record<Edge, boolean>;
}

export interface SliderItem {
  key: keyof ScallopVars;
  label: string;
  min: number;
  max: number;
  step: number;
}

export interface SliderGroup {
  group: string;
  key: "global" | "horizontal" | "vertical" | "corners";
  color: string;
  items: SliderItem[];
}

const DEFAULT_VARS: ScallopVars = {
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

export const DEFAULT_STATE: ScallopState = {
  vars: DEFAULT_VARS,
  frameColor: DEFAULT_FRAME_COLOR,
  synced: true,
  syncEdges: true,
  activeEdges: { top: true, right: true, bottom: true, left: true },
};

export const H_TO_V = {
  horizontal_radius: "vertical_radius",
  horizontal_gap: "vertical_gap",
} as const;

export const EDGES: Edge[] = ["top", "right", "bottom", "left"];

export const SLIDERS: SliderGroup[] = [
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
    ],
  },
  {
    group: "Vertical Edges",
    key: "vertical",
    color: "#8be9fd",
    items: [
      { key: "vertical_radius", label: "Radius", min: 2, max: 40, step: 1 },
      { key: "vertical_gap", label: "Gap", min: 0, max: 40, step: 1 },
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
