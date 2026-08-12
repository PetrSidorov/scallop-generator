import { SLIDERS, type ScallopVars } from "../scallop/constants";
import { SliderControl } from "./SliderControl";

export interface CopyStatus {
  kind: "css" | "html" | "preview";
  status: "success" | "error";
}

interface ControlsProps {
  vars: ScallopVars;
  frameColor: string;
  synced: boolean;
  syncEdges: boolean;
  copyStatus: CopyStatus | null;
  onSetFrameColor: (color: string) => void;
  onSetScallopColor: (color: string) => void;
  onToggleSync: () => void;
  onToggleSyncEdges: () => void;
  onSetVariable: (key: keyof ScallopVars, value: number) => void;
  onReset: () => void;
  onCopyStandalone: () => void;
}

export function Controls({
  vars,
  frameColor,
  synced,
  syncEdges,
  copyStatus,
  onSetFrameColor,
  onSetScallopColor,
  onToggleSync,
  onToggleSyncEdges,
  onSetVariable,
  onReset,
  onCopyStandalone,
}: ControlsProps) {
  return (
    <aside className="controls-col">
      <div className="panel color-panel">
        <div className="panel-section-label">Colors</div>

        <div className="color-row">
          <label htmlFor="frame-color">Frame background</label>
          <div className="color-swatch-wrap">
            <div className="color-swatch" style={{ background: frameColor }}>
              <input
                id="frame-color"
                name="frame-color"
                type="color"
                value={frameColor}
                onChange={(event) => onSetFrameColor(event.target.value)}
              />
            </div>
            <code className="color-hex">{frameColor}</code>
          </div>
        </div>

        {!synced && (
          <div className="color-row">
            <label htmlFor="scallop-color">Scallop color</label>
            <div className="color-swatch-wrap">
              <div
                className="color-swatch"
                style={{ background: vars.scallop_color }}
              >
                <input
                  id="scallop-color"
                  name="scallop-color"
                  type="color"
                  value={vars.scallop_color}
                  onChange={(event) => onSetScallopColor(event.target.value)}
                />
              </div>
              <code className="color-hex">{vars.scallop_color}</code>
            </div>
          </div>
        )}

        <div className="toggle-stack">
          <button
            className={`sync-btn ${synced ? "on" : ""}`}
            aria-pressed={synced}
            onClick={onToggleSync}
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
            aria-pressed={syncEdges}
            onClick={onToggleSyncEdges}
          >
            <span className="sync-icon">{syncEdges ? "⇔" : "⇌"}</span>
            <span>{syncEdges ? "H & V edges synced" : "Edges independent"}</span>
          </button>
        </div>
      </div>

      {SLIDERS.filter((group) =>
        syncEdges ? group.key !== "vertical" : true,
      ).map((group) => (
        <div key={group.key} className="panel slider-panel">
          <div className="panel-section-label" style={{ color: group.color }}>
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
              value={vars[key] as number}
              onChange={(value) => onSetVariable(key, value)}
              color={group.color}
            />
          ))}
        </div>
      ))}

      <div className="action-row">
        <button className="btn-reset" onClick={onReset}>
          Reset
        </button>

        <button
          className={`btn-copy ${
            copyStatus?.kind === "preview" && copyStatus.status === "success"
              ? "copied"
              : ""
          }`}
          onClick={onCopyStandalone}
        >
          {copyStatus?.kind === "preview"
            ? copyStatus.status === "success"
              ? "✓ Copied!"
              : "Copy failed"
            : "⎘ Standalone file"}
        </button>
      </div>
    </aside>
  );
}
