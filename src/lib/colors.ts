import { argbFromHex, TonalPalette, Blend, hexFromArgb, DislikeAnalyzer, Hct } from "@material/material-color-utilities";

/**
 * This library use the same color strategy designed for
 * Material You:
 * https://material.io/blog/science-of-color-design
 */

export const COLOR_REF_LINK = "#0066FF";
export const COLOR_REF_LINK_VISITED = "#FF00FF";
export const COLOR_REF_SUCCESS = "#00ff00";
export const COLOR_REF_ERROR = "#ff0000";
export const COLOR_REF_WARNING = "#FFFF00";
export const COLOR_REF_INFO = "#0000a5";

export interface MyColorTheme {
  neutral?: MyColorPalette;
  link?: MyColorPalette;
  linkVisited?: MyColorPalette;
  success?: MyColorPalette;
  error?: MyColorPalette;
  warning?: MyColorPalette;
  info?: MyColorPalette;
}

export type MyColorPalette = MyColorStop[];

export type MyColorStop = {
  name: string;
  value: number; // argb as returned by Material Colors lib
};

function createPalette(paletteBase: MyColorPalette, fromColor: number) {
  let newPalette = structuredClone(paletteBase);
  let materialPalette = TonalPalette.fromInt(fromColor);

  newPalette.forEach((cs) => {
    cs.value = DislikeAnalyzer.fixIfDisliked(Hct.fromInt(materialPalette.tone(cs.value))).toInt();
  });

  return newPalette;
}

/**
 * Naming convention for PALETTE_NEUTRAL:
 *
 * 50: Text [dark]
 * 100: Background [light]
 * 300: Secondary background [light]
 * 500: Accent color - Manually picked: WCAG 4.5:1 on both [light]+[dark] background
 * 700: Secondary background [dark]
 * 900: Background [dark]
 * 950: Text [light]
 */

const PALETTE_NEUTRAL = [
  { name: "50", value: 95 },
  { name: "100", value: 97 },
  { name: "300", value: 94 },
  { name: "500", value: 50 },
  { name: "700", value: 17 },
  { name: "900", value: 9 },
  { name: "950", value: 10 },
];

/**
 * From https://webaim.org/resources/linkcontrastchecker/
 *
 * For usability and accessibility, links should be underlined by default.
 * Otherwise, link text must have at least 3:1 contrast with surrounding body text,
 * and must present a non-color indicator (typically underline) on mouse hover
 * and keyboard focus.
 *
 * In addition, both links and body text must have at least 4.5:1 contrast
 * with the background (3:1 for large text) to meet WCAG 2 Level AA.
 */

/**
 * Naming convention for PALETTE_LINK:
 *
 * 50: Text [dark] - WCAG 3:1 against NEUTRAL_50 and WCAG 4.5:1 against NEUTRAL_700
 * 950: Text [dark] - WCAG 3:1 against NEUTRAL_950 and WCAG 4.5:1 against NEUTRAL_700
 */
const PALETTE_LINK = [
  { name: "50", value: 17 + 38 },
  { name: "950", value: 94 - 49 },
];

/**
 * Naming convention for PALETTE_SEMANTIC:
 *
 * 300: Background [light] / Text+Foreground [dark]
 * 700: Text+Foreground [light] / Background [dark]
 *
 * Should pass WCAG 7:1
 */
const PALETTE_SEMANTIC = [
  { name: "300", value: 80 },
  { name: "500", value: 50 },
  { name: "700", value: 20 },
];

export function createNewTheme(fromColor: string) {
  if (!/^#[0-9A-F]{6}$/i.test(fromColor)) {
    return {};
  }

  const argb = argbFromHex(fromColor);

  return {
    neutral: createPalette(PALETTE_NEUTRAL, argb),

    link: createPalette(PALETTE_LINK, Blend.harmonize(argbFromHex(COLOR_REF_LINK), argb)),
    linkVisited: createPalette(PALETTE_LINK, Blend.harmonize(argbFromHex(COLOR_REF_LINK_VISITED), argb)),
    success: createPalette(PALETTE_SEMANTIC, Blend.harmonize(argbFromHex(COLOR_REF_SUCCESS), argb)),
    error: createPalette(PALETTE_SEMANTIC, Blend.harmonize(argbFromHex(COLOR_REF_ERROR), argb)),
    warning: createPalette(
      PALETTE_SEMANTIC,
      Blend.hctHue(argbFromHex(COLOR_REF_WARNING), Blend.harmonize(argbFromHex(COLOR_REF_WARNING), argb), 0.25)
    ),
    info: createPalette(PALETTE_SEMANTIC, Blend.harmonize(argbFromHex(COLOR_REF_INFO), argb)),
  };
}

export function argbToHex(argb: number) {
  return hexFromArgb(argb);
}
