# Scallop Generator

A visual tool for designing CSS scalloped edges using `radial-gradient` — pure CSS. Adjust parameters with sliders, preview changes live, and copy the ready-to-use HTML + CSS to your clipboard.

---

## What it does

The scallop effect works by placing absolutely-positioned `<div>` elements along each edge of a wrapper. Each edge div uses a repeating `radial-gradient` that renders a row (or column) of semicircular "bites" — creating the scalloped look. All the shape parameters are controlled via CSS custom properties on the wrapper, so the whole thing is easy to override per-instance.

---

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

To build for production:

```bash
npm run build
```

---

## How to use the generator

### Colors

**Frame Background** sets the background color of the outer wrapper element in the preview. This is the color your scalloped container will sit against — or be made of.

**Sync toggle** (on by default) keeps `--scallop-color` locked to the frame background. This is the typical use case: the scallops are cut-outs that reveal whatever is behind the wrapper, so they need to match the surrounding color. Turn sync off to set the scallop color independently — useful when the wrapper sits on a solid known background and you want to hardcode the color directly.

---

### Sliders

#### Global

| Parameter | What it controls |
|---|---|
| **Cut Depth** | How deep the scallops bite in, as a multiplier of the radius. `1.0` = a perfect semicircle. Higher values make the scallops taller/deeper, lower values make them flatter. |
| **Ellipse Ratio** | Horizontal stretch of each scallop. `1.0` = circular. Higher = wider, flatter scallops. Lower = narrower, tighter scallops. |

#### Horizontal Edges (top & bottom)

| Parameter | What it controls |
|---|---|
| **Radius** | Base size of each scallop in `px`. This is the primary size control. |
| **Gap** | Space between scallops in `px`. `0` = scallops touch. |
| **Start Offset** | How far from the left edge the scallop row begins. Useful for leaving room for rounded corners or borders. |
| **End Offset** | How far from the right edge the scallop row ends. |

#### Vertical Edges (left & right)

Same parameters as horizontal, but applied to the left and right edges. Radius and gap here control the vertical scallop column independently from the horizontal ones.

---

### Edge toggles

The **top / right / bottom / left** pill buttons in the preview let you toggle individual edges on and off to see exactly which edges you want active. Only affects the preview — the generated code always includes all four edge divs (you can delete the ones you don't need).

---

## Using the output

Click **Copy CSS + HTML** to copy both blocks to your clipboard. The CSS tab and HTML tab in the code panel let you preview each separately.

**What you get:**

The CSS block contains two parts: a `.scallop-wrapper` rule with your custom property values baked in, followed by the full static rules for all four edge classes.

The HTML block is the wrapper div with the same custom properties as inline styles (an alternative to the class approach — use whichever fits your project), plus the four edge divs.

**Typical integration:**

1. Drop the static CSS classes into your stylesheet (you only need to do this once per project).
2. Apply your custom property values either via a CSS class or inline styles on each `.scallop-wrapper` instance.
3. Place your content inside the wrapper, after the four edge divs.

```html
<div class="scallop-wrapper" style="--scallop-color: #f3dde9; ...">
    <div class="scallop-wrapper__edge-top"></div>
    <div class="scallop-wrapper__edge-right"></div>
    <div class="scallop-wrapper__edge-bottom"></div>
    <div class="scallop-wrapper__edge-left"></div>

    <!-- your content here -->
</div>
```

The wrapper needs `position: relative` and `overflow: hidden` (already in the CSS). Make sure the parent element has the background color that the scallop color is synced to, or the cut-out illusion won't work.

---

## CSS custom properties reference

| Property | Default | Description |
|---|---|---|
| `--scallop-color` | — | Color of the scallop shapes. Should match the background behind the wrapper. |
| `--cut-depth` | `1.25` | Depth multiplier for all edges (overridden per-axis by `--horizontal-cut-depth` / `--vertical-cut-depth`). |
| `--ellipse-ratio` | `1.2` | Width stretch of each scallop ellipse. |
| `--horizontal-radius` | `6px` | Scallop size on top/bottom edges. |
| `--horizontal-gap` | `6px` | Gap between scallops on top/bottom edges. |
| `--horizontal-start` | `16px` | Left inset before scallops begin on top/bottom. |
| `--horizontal-end` | `16px` | Right inset after scallops end on top/bottom. |
| `--vertical-radius` | `4px` | Scallop size on left/right edges. |
| `--vertical-gap` | `2px` | Gap between scallops on left/right edges. |
| `--vertical-start` | `16px` | Top inset before scallops begin on left/right. |
| `--vertical-end` | `16px` | Bottom inset after scallops end on left/right. |

You can also set `--horizontal-cut-depth` or `--vertical-cut-depth` directly on the wrapper to override `--cut-depth` per axis.

---

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- Zero runtime dependencies beyond React itself
- Fonts: Playfair Display, DM Mono (Google Fonts)
