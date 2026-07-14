export function SliderControl({
  label,
  min,
  max,
  step,
  value,
  onChange,
  color,
  name,
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const isPixel = !["cut_depth", "ellipse_ratio"].includes(label);
  const displayVal = Number.isInteger(step) ? value : value.toFixed(2);

  return (
    <div className="slider-row">
      <div className="slider-meta">
        <span className="slider-label">{label}</span>
        <span className="slider-val" style={{ color }}>
          {displayVal}
          {isPixel ? "px" : ""}
        </span>
      </div>
      <div className="slider-track-wrap">
        <div
          className="slider-fill"
          style={{ width: `${pct}%`, background: color }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{ "--thumb-color": color }}
        />
      </div>
    </div>
  );
}
