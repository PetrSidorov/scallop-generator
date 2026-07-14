import { useReducer, useState } from "react";
import { DEFAULT_STATE, SLIDERS, EDGES } from "./constants";
import { reducer } from "./reducer";
import { buildCSS } from "./utils";
import { buildCode } from "./utils";
import { buildFullTemplate } from "./utils";
import { SliderControl } from "./SliderControl";

export default function App() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const [copied, setCopied] = useState(null);
  const [activeTab, setActiveTab] = useState("html");

  const { vars, frameColor, synced, syncEdges, activeEdges } = state;
  const effectiveScallopColor = synced ? frameColor : vars.scallop_color;
  const exportVars = { ...vars, scallop_color: effectiveScallopColor };

  const copyTo = async (kind) => {
    const text =
      kind === "css"
        ? buildCSS(exportVars)
        : kind === "html"
          ? buildCode()
          : buildFullTemplate(exportVars, frameColor);
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1800);
  };

  const scallop_css_vars = {
    "--scallop-color": effectiveScallopColor,
    "--cut-depth": vars.cut_depth,
    "--ellipse-ratio": vars.ellipse_ratio,
    "--horizontal-radius": `${vars.horizontal_radius}px`,
    "--horizontal-gap": `${vars.horizontal_gap}px`,
    "--horizontal-start": `${vars.horizontal_start}px`,
    "--horizontal-end": `${vars.horizontal_end}px`,
    "--vertical-radius": `${vars.vertical_radius}px`,
    "--vertical-gap": `${vars.vertical_gap}px`,
    // "--vertical-start": `${vars.vertical_start}px`,
    // "--vertical-end": `${vars.vertical_end}px`,
    "--top-left-corner": `${vars.top_left_corner}px`,
    "--bottom-left-corner": `${vars.bottom_left_corner}px`,
    "--top-right-corner": `${vars.top_right_corner}px`,
    "--bottom-right-corner": `${vars.bottom_right_corner}px`,
  };

  return (
    <div className="app">
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />

      <header className="app-header">
        <div className="header-badge">Pure CSS · Zero dependencies</div>
        <h1 className="header-title">
          <span className="grad-text">Scallop</span>
          <br />
          <span className="grad-text2">Generator</span>
        </h1>
        <p className="header-sub">
          Build gorgeous scalloped edges with nothing but{" "}
          <code>radial-gradient</code>. Copy the CSS and you're done.
        </p>
      </header>

      <main className="app-body">
        <section className="panel preview-panel">
          <div className="panel-header">
            <span className="panel-header-dot dot-red" />
            <span className="panel-header-dot dot-yellow" />
            <span className="panel-header-dot dot-green" />
            <span className="panel-title">Live Preview</span>
          </div>

          <div className="preview-stage">
            <div className="outer-frame" style={{ background: frameColor }}>
              <div className="scallop-wrapper" style={scallop_css_vars}>
                {activeEdges.top && (
                  <div className="scallop-wrapper__edge-top" />
                )}
                {activeEdges.right && (
                  <div className="scallop-wrapper__edge-right" />
                )}
                {activeEdges.bottom && (
                  <div className="scallop-wrapper__edge-bottom" />
                )}
                {activeEdges.left && (
                  <div className="scallop-wrapper__edge-left" />
                )}
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
                onClick={() => dispatch({ type: "TOGGLE_EDGE", edge })}
              >
                {edge}
              </button>
            ))}
          </div>
        </section>

        <aside className="controls-col">
          <div className="panel color-panel">
            <div className="panel-section-label">Colors</div>

            <div className="color-row">
              <label>Frame background</label>
              <div className="color-swatch-wrap">
                <div
                  className="color-swatch"
                  style={{ background: frameColor }}
                >
                  <input
                    type="color"
                    value={frameColor}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FRAME_COLOR",
                        color: e.target.value,
                      })
                    }
                  />
                </div>
                <code className="color-hex">{frameColor}</code>
              </div>
            </div>

            {!synced && (
              <div className="color-row">
                <label>Scallop color</label>
                <div className="color-swatch-wrap">
                  <div
                    className="color-swatch"
                    style={{ background: vars.scallop_color }}
                  >
                    <input
                      type="color"
                      value={vars.scallop_color}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SCALLOP_COLOR",
                          color: e.target.value,
                        })
                      }
                    />
                  </div>
                  <code className="color-hex">{vars.scallop_color}</code>
                </div>
              </div>
            )}

            <div className="toggle-stack">
              <button
                className={`sync-btn ${synced ? "on" : ""}`}
                onClick={() => dispatch({ type: "TOGGLE_SYNC" })}
              >
                <span className="sync-icon">{synced ? "🔗" : "🔓"}</span>
                <span>
                  {synced
                    ? "Scallop synced to frame"
                    : "Scallop color independent"}
                </span>
              </button>
              <button
                className={`sync-btn ${syncEdges ? "on" : ""}`}
                onClick={() => dispatch({ type: "TOGGLE_SYNC_EDGES" })}
              >
                <span className="sync-icon">{syncEdges ? "⇔" : "⇌"}</span>
                <span>
                  {syncEdges ? "H & V edges synced" : "Edges independent"}
                </span>
              </button>
            </div>
          </div>

          {SLIDERS.filter((g) => (syncEdges ? g.key !== "vertical" : true)).map(
            (group) => (
              <div key={group.key} className="panel slider-panel">
                <div
                  className="panel-section-label"
                  style={{ color: group.color }}
                >
                  {group.group}
                </div>
                {group.items.map(({ key, label, min, max, step }) => (
                  <SliderControl
                    key={key}
                    name={key}
                    label={label}
                    min={min}
                    max={max}
                    step={step}
                    value={vars[key]}
                    onChange={(val) => dispatch({ type: "SET_VAR", key, val })}
                    color={group.color}
                  />
                ))}
              </div>
            ),
          )}

          <div className="action-row">
            <button
              className="btn-reset"
              onClick={() => dispatch({ type: "RESET" })}
            >
              Reset
            </button>
            <button
              className={`btn-copy ${copied === "preview" ? "copied" : ""}`}
              onClick={() => copyTo("preview")}
            >
              {copied === "preview" ? "✓ Copied!" : "⎘ Standalone file"}
            </button>
          </div>
        </aside>
      </main>

      <section className="panel code-panel">
        <div className="code-header">
          <div className="code-tabs">
            {["html", "css"].map((tab) => (
              <button
                key={tab}
                className={`code-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="copy-actions">
            <button
              className={`btn-copy-sm ${copied === "css" ? "copied" : ""}`}
              onClick={() => copyTo("css")}
            >
              {copied === "css" ? "✓" : "⎘"} CSS
            </button>
            <button
              className={`btn-copy-sm ${copied === "html" ? "copied" : ""}`}
              onClick={() => copyTo("html")}
            >
              {copied === "html" ? "✓" : "⎘"} HTML
            </button>
            <button
              className={`btn-copy-sm highlight ${copied === "preview" ? "copied" : ""}`}
              onClick={() => copyTo("preview")}
            >
              {copied === "preview" ? "✓ Copied!" : "⎘ Standalone file"}
            </button>
          </div>
        </div>
        <pre className="code-block">
          <code>
            {activeTab === "html" ? buildCode() : buildCSS(exportVars)}
          </code>
        </pre>
      </section>

      <footer className="app-footer">
        Pure CSS · No JS required at runtime · Works in all modern browsers
      </footer>
    </div>
  );
}
