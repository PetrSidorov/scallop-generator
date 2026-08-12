import type { CSSProperties } from "react";

interface SliderControlProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  color: string;
  name: string;
}

export function SliderControl({
  label,
  min,
  max,
  step,
  value,
  onChange,
  color,
  name,
}: SliderControlProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const isPixel = !["cut_depth", "ellipse_ratio"].includes(name);
  const displayVal = Number.isInteger(step) ? value : value.toFixed(2);

  return (
    <div className="slider-row">
      <div className="slider-meta">
        <label className="slider-label" htmlFor={name}>
          {label}
        </label>
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
          id={name}
          name={name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(parseFloat(event.target.value))}
          style={{ "--thumb-color": color } as CSSProperties}
        />
      </div>
    </div>
  );
}
