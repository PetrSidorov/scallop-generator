# Scallop Generator

https://petrsidorov.github.io/scallop-generator/

A visual tool for designing CSS scalloped edges with `radial-gradient`. Adjust the shape, preview changes live, and copy reusable CSS, HTML, or a complete standalone HTML file.

## Features

- Independent horizontal and vertical scallop settings
- Optional syncing between horizontal and vertical edges
- Independent control over all four corners
- Individual edge visibility toggles
- Custom frame and scallop colors
- CSS export
- HTML export
- Complete standalone HTML export
- Pure CSS scallop output with no JavaScript required at runtime

## Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Then open:

```text
http://localhost:5173/scallop-generator/
```

Run tests:

```bash
pnpm test
```

Run linting:

```bash
pnpm lint
```

Create a production build:

```bash
pnpm build
```

## How it works

The scallop effect uses absolutely positioned edge elements around a wrapper. Each edge renders repeating semicircular shapes with `radial-gradient`.

The generator keeps shape configuration in application state, previews that configuration in React, and uses the same values to generate portable HTML and CSS.

The generated scallop effect itself does not require React or JavaScript.

## Controls

### Colors

**Frame background** controls the background surrounding the scalloped content.

**Scallop synced to frame** keeps the scallop color equal to the frame background. Turn syncing off to choose a separate scallop color.

### Edge syncing

**H & V edges synced** makes the horizontal radius and gap control both axes.

Turn syncing off to configure horizontal and vertical edge dimensions independently.

### Global shape

| Parameter | Description |
| --- | --- |
| **Cut Depth** | Controls how deeply the scallops extend into the wrapper. |
| **Ellipse Ratio** | Controls how wide or narrow the scallops are. |

### Horizontal edges

These settings affect the top and bottom edges.

| Parameter | Description |
| --- | --- |
| **Radius** | Base scallop radius. |
| **Gap** | Space between neighboring scallops. |

### Vertical edges

When horizontal and vertical edge syncing is disabled, these controls affect the left and right edges independently.

| Parameter | Description |
| --- | --- |
| **Radius** | Base scallop radius. |
| **Gap** | Space between neighboring scallops. |

### Corners

Each corner can reserve its own amount of space before the scallop pattern begins:

- Top left
- Top right
- Bottom left
- Bottom right

### Visible edges

The **top**, **right**, **bottom**, and **left** controls toggle individual edges in the live preview.

## Export

### CSS

Copies the generated scallop CSS for the current configuration.

### HTML

Copies the wrapper markup and four edge elements.

### Standalone file

Copies a complete HTML document containing both the generated CSS and sample markup.

## Typical integration

Add the generated CSS to your stylesheet and use the generated markup:

```html
<div class="scallop-wrapper">
  <div class="scallop-wrapper__edge-top"></div>
  <div class="scallop-wrapper__edge-right"></div>
  <div class="scallop-wrapper__edge-bottom"></div>
  <div class="scallop-wrapper__edge-left"></div>

  <!-- Your content here -->
</div>
```

The wrapper uses `position: relative` and `overflow: hidden`.

For the cut-out effect, the scallop color normally matches the background surrounding the wrapper.

## Architecture

The app is intentionally small:

- `src/components` contains the React UI
- `src/scallop/constants.js` defines generator defaults and control metadata
- `src/scallop/reducer.js` owns state transitions and synchronization rules
- `src/scallop/generator.js` generates reusable CSS and HTML
- `src/scallop/*.test.js` covers reducer behavior and generated output

## Stack

- React
- Vite
- Vitest
- ESLint
- pnpm
- Pure CSS scallop output
- Fonts: Fraunces, Fira Code, and Lato
