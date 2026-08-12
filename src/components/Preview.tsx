import type { CSSProperties } from "react";
import { EDGES, type Edge, type ScallopVars } from "../scallop/constants";

interface PreviewProps {
  vars: ScallopVars;
  frameColor: string;
  scallopColor: string;
  activeEdges: Record<Edge, boolean>;
  onToggleEdge: (edge: Edge) => void;
}

export function Preview({
  vars,
  frameColor,
  scallopColor,
  activeEdges,
  onToggleEdge,
}: PreviewProps) {
  const scallopCssVars = {
    "--scallop-color": scallopColor,
    "--cut-depth": vars.cut_depth,
    "--ellipse-ratio": vars.ellipse_ratio,
    "--horizontal-radius": `${vars.horizontal_radius}px`,
    "--horizontal-gap": `${vars.horizontal_gap}px`,
    "--vertical-radius": `${vars.vertical_radius}px`,
    "--vertical-gap": `${vars.vertical_gap}px`,
    "--top-left-corner": `${vars.top_left_corner}px`,
    "--bottom-left-corner": `${vars.bottom_left_corner}px`,
    "--top-right-corner": `${vars.top_right_corner}px`,
    "--bottom-right-corner": `${vars.bottom_right_corner}px`,
  } as CSSProperties;

  return (
    <section className="panel preview-panel">
      <div className="panel-header">
        <span className="panel-header-dot dot-red" />
        <span className="panel-header-dot dot-yellow" />
        <span className="panel-header-dot dot-green" />
        <span className="panel-title">Live Preview</span>
      </div>

      <div className="preview-stage">
        <div className="outer-frame" style={{ background: frameColor }}>
          <div className="scallop-wrapper" style={scallopCssVars}>
            {activeEdges.top && <div className="scallop-wrapper__edge-top" />}
            {activeEdges.right && <div className="scallop-wrapper__edge-right" />}
            {activeEdges.bottom && <div className="scallop-wrapper__edge-bottom" />}
            {activeEdges.left && <div className="scallop-wrapper__edge-left" />}

            <div className="inner-frame">
              <div className="demo-content">
                <span className="demo-eyebrow">Sample Content</span>
                <span className="demo-text">Your content here</span>
                <span className="demo-sub">Drag the sliders →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="edge-toggles">
        <span className="toggles-label">Visible edges</span>
        {EDGES.map((edge) => (
          <button
            key={edge}
            className={`edge-btn ${activeEdges[edge] ? "active" : ""}`}
            aria-pressed={activeEdges[edge]}
            onClick={() => onToggleEdge(edge)}
          >
            {edge}
          </button>
        ))}
      </div>
    </section>
  );
}
