import { useState } from "react";
import { buildCSS, buildHTML } from "../scallop/generator";

export function CodeOutput({ exportVars, copyStatus, onCopy }) {
  const [activeTab, setActiveTab] = useState("html");

  return (
    <section className="panel code-panel">
      <div className="code-header">
        <div className="code-tabs" role="tablist" aria-label="Generated code format">
          {["html", "css"].map((tab) => (
            <button
              key={tab}
              id={`code-tab-${tab}`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls="generated-code-panel"
              className={`code-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="copy-actions">
          <button
            className={`btn-copy-sm ${
              copyStatus?.kind === "css" && copyStatus.status === "success"
                ? "copied"
                : ""
            }`}
            onClick={() => onCopy("css")}
          >
            {copyStatus?.kind === "css"
              ? copyStatus.status === "success"
                ? "✓ CSS"
                : "Copy failed"
              : "⎘ CSS"}
          </button>

          <button
            className={`btn-copy-sm ${
              copyStatus?.kind === "html" && copyStatus.status === "success"
                ? "copied"
                : ""
            }`}
            onClick={() => onCopy("html")}
          >
            {copyStatus?.kind === "html"
              ? copyStatus.status === "success"
                ? "✓ HTML"
                : "Copy failed"
              : "⎘ HTML"}
          </button>

          <button
            className={`btn-copy-sm highlight ${
              copyStatus?.kind === "preview" && copyStatus.status === "success"
                ? "copied"
                : ""
            }`}
            onClick={() => onCopy("preview")}
          >
            {copyStatus?.kind === "preview"
              ? copyStatus.status === "success"
                ? "✓ Copied!"
                : "Copy failed"
              : "⎘ Standalone file"}
          </button>
        </div>
      </div>

      <pre
        id="generated-code-panel"
        className="code-block"
        role="tabpanel"
        aria-labelledby={`code-tab-${activeTab}`}
      >
        <code>{activeTab === "html" ? buildHTML() : buildCSS(exportVars)}</code>
      </pre>
    </section>
  );
}
