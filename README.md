# Scallop Generator

https://petrsidorov.github.io/scallop-generator/
A visual tool for designing CSS scalloped edges using `radial-gradient` — pure CSS. Adjust shape parameters with sliders, preview changes live, and copy ready-to-use CSS, HTML, or a complete standalone HTML file.

---

## What it does

The scallop effect works by placing absolutely positioned `<div>` elements along each edge of a wrapper. Each edge uses a repeating `radial-gradient` to render a row or column of semicircular shapes, creating the scalloped look.

Shape parameters are controlled through CSS custom properties on the wrapper, making the result easy to reuse and customize per instance.

The generator supports:

- Independent horizontal and vertical scallop settings
- Optional syncing between horizontal and vertical edges
- Independent control over all four corners
- Individual edge visibility toggles
- Custom frame and scallop colors
- CSS and HTML export
- Complete standalone HTML file export

---

## Getting started

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173/scallop-generator/
```

To build for production:

```bash
npm run build
```

---

## How to use the generator

### Colors

**Frame Background** sets the background color surrounding the scalloped container in the preview.

**Scallop synced to frame** is enabled by default and keeps `--scallop-color` locked to the frame background. This is useful when the scallop shapes should visually blend into the surrounding background.

Turn syncing off to choose the scallop color independently.

---

### Edge syncing

The **H & V edges synced** toggle controls whether horizontal and vertical edges share the same scallop settings.

When enabled, the horizontal edge settings are used for both axes and the separate vertical controls are hidden.

Turn syncing off to configure the top and bottom edges independently from the left and right edges.

---

### Sliders

#### Global

| Parameter         | What it controls                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cut Depth**     | How deeply the scallops extend into the wrapper. `1.0` corresponds to a semicircular shape. Higher values make the scallops deeper, while lower values make them flatter. |
| **Ellipse Ratio** | Controls the horizontal stretch of each scallop. `1.0` is circular. Higher values produce wider shapes, while lower values produce narrower ones.                         |

#### Horizontal edges

These settings control the top and bottom edges.

| Parameter        | What it controls                                                  |
| ---------------- | ----------------------------------------------------------------- |
| **Radius**       | Base size of each scallop in pixels.                              |
| **Gap**          | Space between neighboring scallops. `0` means the scallops touch. |
| **Start Offset** | Distance from the left side before the scallop pattern begins.    |
| **End Offset**   | Distance from the right side where the scallop pattern ends.      |

#### Vertical edges

When horizontal and vertical edge syncing is disabled, the vertical controls let you configure the left and right edges independently.

The vertical radius and gap control the size and spacing of the scallops along those edges.

#### Corners

Each corner can be adjusted independently:

- Top left
- Top right
- Bottom left
- Bottom right

These controls let you reserve different amounts of space around individual corners before the scallop pattern begins or ends.

---

### Edge toggles

The **top / right / bottom / left** buttons in the preview let you show or hide individual scalloped edges.

These toggles affect the live preview only. The generated HTML still includes all four edge elements, so you can remove any edges you do not need.

---

## Exporting the result

The generator provides three export options.

### CSS

Copies the generated scallop CSS, including the current custom property values and the static rules required for the edge elements.

### HTML

Copies the wrapper markup with all four edge elements.

### Standalone file

Copies a complete standalone HTML document containing the generated HTML and CSS together, ready to save as an `.html` file and open directly in a browser.

---

## Typical integration

Add the generated CSS to your stylesheet, then use the generated HTML structure:

```html
<div class="scallop-wrapper">
  <div class="scallop-wrapper__edge-top"></div>
  <div class="scallop-wrapper__edge-right"></div>
  <div class="scallop-wrapper__edge-bottom"></div>
  <div class="scallop-wrapper__edge-left"></div>

  <!-- Your content here -->
</div>
```

The generated CSS applies the required custom properties and edge styles.

The wrapper uses `position: relative` and `overflow: hidden`. For the cut-out illusion to work correctly, the scallop color should normally match the background surrounding the wrapper.

---

## CSS custom properties reference

| Property                | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| `--scallop-color`       | Color used for the scallop shapes. Usually matches the background surrounding the wrapper. |
| `--cut-depth`           | Global depth multiplier for the scallops.                                                  |
| `--ellipse-ratio`       | Controls the width-to-height ratio of each scallop.                                        |
| `--horizontal-radius`   | Scallop size for the top and bottom edges.                                                 |
| `--horizontal-gap`      | Space between scallops on the top and bottom edges.                                        |
| `--horizontal-start`    | Left-side offset before horizontal scallops begin.                                         |
| `--horizontal-end`      | Right-side offset where horizontal scallops end.                                           |
| `--vertical-radius`     | Scallop size for the left and right edges.                                                 |
| `--vertical-gap`        | Space between scallops on the left and right edges.                                        |
| `--top-left-corner`     | Reserved space around the top-left corner.                                                 |
| `--top-right-corner`    | Reserved space around the top-right corner.                                                |
| `--bottom-left-corner`  | Reserved space around the bottom-left corner.                                              |
| `--bottom-right-corner` | Reserved space around the bottom-right corner.                                             |

The generated CSS may also use axis-specific values internally when horizontal and vertical settings differ.

---

## Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- Pure CSS scallop output
- No JavaScript required for the generated scallop effect at runtime
- Fonts: Playfair Display and DM Mono
