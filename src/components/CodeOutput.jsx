import { useState } from "react";
import { buildCSS, buildHTML } from "../scallop/generator";

export function CodeOutput({ exportVars, copied, onCopy }) {
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
            className={`btn-copy-sm ${copied === "css" ? "copied" : ""}`}
            onClick={() => onCopy("css")}
          >
            {copied === "css" ? "✓" : "⎘"} CSS
          </button>

          <button
            className={`btn-copy-sm ${copied === "html" ? "copied" : ""}`}
            onClick={() => onCopy("html")}
          >
            {copied === "html" ? "✓" : "⎘"} HTML
          </button>

          <button
            className={`btn-copy-sm highlight ${copied === "preview" ? "copied" : ""}`}
            onClick={() => onCopy("preview")}
          >
            {copied === "preview" ? "✓ Copied!" : "⎘ Standalone file"}
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
