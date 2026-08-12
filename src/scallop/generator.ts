import { H_TO_V, type ScallopVars } from "./constants";

export function mirrorToVertical(vars: ScallopVars): ScallopVars {
  const mirrored = Object.fromEntries(
    Object.entries(H_TO_V).map(([hKey, vKey]) => [
      vKey,
      vars[hKey as keyof typeof H_TO_V],
    ]),
  );

  return { ...vars, ...mirrored } as ScallopVars;
}

export function px(n: number): string {
  return `${+n.toFixed(2)}px`;
}

export function computeVals(vars: ScallopVars) {
  const hHeight = vars.horizontal_radius * vars.cut_depth;
  const hWidth = vars.horizontal_radius * 2 * vars.ellipse_ratio;
  const hStep = hWidth + vars.horizontal_gap;
  const hRadius = vars.horizontal_radius;

  const vWidth = vars.vertical_radius * vars.cut_depth;
  const vHeight = vars.vertical_radius * 2 * vars.ellipse_ratio;
  const vStep = vHeight + vars.vertical_gap;
  const vRadius = vars.vertical_radius;

  return {
    color: vars.scallop_color,
    hHeight,
    hWidth,
    hStep,
    hRadius,
    vWidth,
    vHeight,
    vStep,
    vRadius,
    topLeft: vars.top_left_corner,
    topRight: vars.top_right_corner,
    bottomLeft: vars.bottom_left_corner,
    bottomRight: vars.bottom_right_corner,
  };
}

export function buildFullTemplate(vars: ScallopVars, frameColor: string): string {
  const css = buildCSS(vars);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Scallop Demo</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0ebe8;
      font-family: Georgia, serif;
    }

    .frame {
      width: 360px;
      padding: 10px;
      background: ${frameColor};
    }

    .inner {
      width: 100%;
      aspect-ratio: 0.75;
      background: linear-gradient(to bottom, #ecc9d9 0%, #ffffff 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
    }

    .eyebrow {
      font-size: 0.6rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #7a4a5a;
    }

    .title {
      font-style: italic;
      font-size: 1.3rem;
      color: #4a2a5a;
    }

${css}
  </style>
</head>
<body>
  <div class="frame">
    <div class="scallop-wrapper">
      <div class="scallop-wrapper__edge-top"></div>
      <div class="scallop-wrapper__edge-right"></div>
      <div class="scallop-wrapper__edge-bottom"></div>
      <div class="scallop-wrapper__edge-left"></div>
      <div class="inner">
        <span class="eyebrow">Sample Content</span>
        <span class="title">Your content here</span>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function buildHTML(): string {
  return `<div class="scallop-wrapper">
  <div class="scallop-wrapper__edge-top"></div>
  <div class="scallop-wrapper__edge-right"></div>
  <div class="scallop-wrapper__edge-bottom"></div>
  <div class="scallop-wrapper__edge-left"></div>

  <!-- your content here -->
</div>`;
}

export function buildCSS(vars: ScallopVars): string {
  const v = computeVals(vars);

  return `.scallop-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.scallop-wrapper__edge-top {
  position: absolute;
  top: -1px;
  left: ${px(v.topLeft)};
  width: calc(100% - ${px(v.topLeft + v.topRight)});
  height: ${px(v.hHeight + 1)};
  pointer-events: none;
  background:
    radial-gradient(
      ellipse at center top,
      ${v.color} 0 ${px(v.hRadius)},
      transparent ${px(v.hRadius + 1)}
    ) left top / ${px(v.hStep)} ${px(v.hHeight + 1)} repeat-x;
}

.scallop-wrapper__edge-bottom {
  position: absolute;
  bottom: -1px;
  left: ${px(v.bottomLeft)};
  width: calc(100% - ${px(v.bottomLeft + v.bottomRight)});
  height: ${px(v.hHeight + 1)};
  pointer-events: none;
  background:
    radial-gradient(
      ellipse at center bottom,
      ${v.color} 0 ${px(v.hRadius)},
      transparent ${px(v.hRadius + 1)}
    ) left top / ${px(v.hStep)} ${px(v.hHeight + 1)} repeat-x;
}

.scallop-wrapper__edge-right {
  position: absolute;
  top: ${px(v.topRight)};
  right: -1px;
  width: ${px(v.vWidth + 1)};
  height: calc(100% - ${px(v.topRight + v.bottomRight)});
  pointer-events: none;
  background:
    radial-gradient(
      ellipse at right center,
      ${v.color} 0 ${px(v.vRadius)},
      transparent ${px(v.vRadius + 1)}
    ) left top / ${px(v.vWidth + 1)} ${px(v.vStep)} repeat-y;
}

.scallop-wrapper__edge-left {
  position: absolute;
  top: ${px(v.topLeft)};
  left: -1px;
  width: ${px(v.vWidth + 1)};
  height: calc(100% - ${px(v.topLeft + v.bottomLeft)});
  pointer-events: none;
  background:
    radial-gradient(
      ellipse at left center,
      ${v.color} 0 ${px(v.vRadius)},
      transparent ${px(v.vRadius + 1)}
    ) left top / ${px(v.vWidth + 1)} ${px(v.vStep)} repeat-y;
}`;
}
