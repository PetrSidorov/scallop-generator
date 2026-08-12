import { useEffect, useReducer, useRef, useState } from "react";
import { Controls, type CopyStatus } from "./components/Controls";
import { CodeOutput } from "./components/CodeOutput";
import { Preview } from "./components/Preview";
import { DEFAULT_STATE, type ScallopVars } from "./scallop/constants";
import { reducer } from "./scallop/reducer";
import {
  buildCSS,
  buildFullTemplate,
  buildHTML,
} from "./scallop/generator";

export default function App() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const [copyStatus, setCopyStatus] = useState<CopyStatus | null>(null);
  const copyResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { vars, frameColor, synced, syncEdges, activeEdges } = state;

  const effectiveScallopColor = synced ? frameColor : vars.scallop_color;
  const exportVars: ScallopVars = {
    ...vars,
    scallop_color: effectiveScallopColor,
  };

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const copyTo = async (kind: CopyStatus["kind"]) => {
    const text =
      kind === "css"
        ? buildCSS(exportVars)
        : kind === "html"
          ? buildHTML()
          : buildFullTemplate(exportVars, frameColor);

    if (copyResetTimerRef.current) {
      clearTimeout(copyResetTimerRef.current);
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ kind, status: "success" });
    } catch {
      setCopyStatus({ kind, status: "error" });
    }

    copyResetTimerRef.current = setTimeout(() => {
      setCopyStatus(null);
      copyResetTimerRef.current = null;
    }, 1800);
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
        <Preview
          vars={vars}
          frameColor={frameColor}
          scallopColor={effectiveScallopColor}
          activeEdges={activeEdges}
          onToggleEdge={(edge) => dispatch({ type: "TOGGLE_EDGE", edge })}
        />

        <Controls
          vars={vars}
          frameColor={frameColor}
          synced={synced}
          syncEdges={syncEdges}
          copyStatus={copyStatus}
          onSetFrameColor={(color) =>
            dispatch({ type: "SET_FRAME_COLOR", color })
          }
          onSetScallopColor={(color) =>
            dispatch({ type: "SET_SCALLOP_COLOR", color })
          }
          onToggleSync={() => dispatch({ type: "TOGGLE_SYNC" })}
          onToggleSyncEdges={() => dispatch({ type: "TOGGLE_SYNC_EDGES" })}
          onSetVariable={(key, val) =>
            dispatch({ type: "SET_VAR", key, val })
          }
          onReset={() => dispatch({ type: "RESET" })}
          onCopyStandalone={() => copyTo("preview")}
        />
      </main>

      <CodeOutput
        exportVars={exportVars}
        copyStatus={copyStatus}
        onCopy={copyTo}
      />

      <footer className="app-footer">
        Pure CSS · No JS required at runtime · Works in all modern browsers
      </footer>
    </div>
  );
}
