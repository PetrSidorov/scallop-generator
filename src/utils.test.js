import { describe, expect, it } from "vitest";
import { DEFAULT_STATE } from "./constants";
import { buildCSS, buildFullTemplate } from "./utils";

function makeVars(overrides = {}) {
  return {
    ...DEFAULT_STATE.vars,
    ...overrides,
  };
}

describe("buildCSS", () => {
  it("uses the four corner values for edge geometry", () => {
    const css = buildCSS(
      makeVars({
        top_left_corner: 11,
        top_right_corner: 17,
        bottom_left_corner: 23,
        bottom_right_corner: 29,
      }),
    );

    expect(css).toContain("left: 11px;");
    expect(css).toContain("width: calc(100% - 28px);");

    expect(css).toContain("left: 23px;");
    expect(css).toContain("width: calc(100% - 52px);");

    expect(css).toContain("top: 17px;");
    expect(css).toContain("height: calc(100% - 46px);");

    expect(css).toContain("top: 11px;");
    expect(css).toContain("height: calc(100% - 34px);");
  });

  it("uses horizontal and vertical radius and gap values", () => {
    const css = buildCSS(
      makeVars({
        horizontal_radius: 10,
        horizontal_gap: 3,
        vertical_radius: 7,
        vertical_gap: 5,
        cut_depth: 1,
        ellipse_ratio: 1,
      }),
    );

    expect(css).toContain("#f3dde9 0 10px");
    expect(css).toContain("left top / 23px 11px repeat-x");

    expect(css).toContain("#f3dde9 0 7px");
    expect(css).toContain("left top / 8px 19px repeat-y");
  });

  it("uses the selected scallop color", () => {
    const css = buildCSS(
      makeVars({
        scallop_color: "#123456",
      }),
    );

    expect(css).toContain("#123456");
  });

  it("never emits NaN or undefined for a valid configuration", () => {
    const css = buildCSS(makeVars());

    expect(css).not.toContain("NaN");
    expect(css).not.toContain("undefined");
  });
});

describe("buildFullTemplate", () => {
  it("contains the selected frame color and generated scallop CSS", () => {
    const vars = makeVars({
      scallop_color: "#445566",
      horizontal_radius: 9,
    });

    const template = buildFullTemplate(vars, "#112233");

    expect(template).toContain("<!DOCTYPE html>");
    expect(template).toContain("background: #112233;");
    expect(template).toContain("#445566");
    expect(template).toContain("0 9px");
    expect(template).toContain('class="scallop-wrapper"');
  });
});
