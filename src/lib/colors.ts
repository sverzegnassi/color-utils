import { argbFromHex, TonalPalette, Blend, hexFromArgb } from "@material/material-color-utilities";
import Color from "colorjs.io";

/**
 * This library use the same color strategy designed for
 * Material You:
 * https://material.io/blog/science-of-color-design
 */

export const COLOR_REF_LINK = "#0066FF";
export const COLOR_REF_LINK_VISITED = "#FF00FF";
export const COLOR_REF_SUCCESS = "#00ff00";
export const COLOR_REF_ERROR = "#ff0000";
export const COLOR_REF_WARNING = "#FFD000";
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
    cs.value = materialPalette.tone(cs.value);
  });

  return newPalette;
}

const PALETTE_NEUTRAL = [
  { name: "100", value: 98 }, // Light: Background  +  Dark: Text
  { name: "200", value: 96 }, // Light: Secondary BG
  { name: "300", value: 84 }, // Light: Border
  { name: "400", value: 60 }, // Dark: Disabled Text / Placeholder
  { name: "500", value: 50 }, // ACCENT COLOR
  { name: "600", value: 44 }, // Light: Disabled Text
  { name: "700", value: 39 }, // Dark: Border
  { name: "800", value: 16 }, // Dark: Secondary BG
  { name: "900", value: 10 }, // Dark: Background  +  Light: Text
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

const PALETTE_LINK = [
  { name: "100", value: 59 },
  { name: "900", value: 45 },
];

/**
 * Naming convention for PALETTE_SEMANTIC:
 *
 * 300: Background [light] / Text+Foreground [dark]
 * 500: Border [light + dark]
 * 700: Text+Foreground [light] / Background [dark]
 *
 * Should pass WCAG 7:1
 */
const PALETTE_SEMANTIC = [
  { name: "300", value: 85 },
  { name: "500", value: 48 },
  { name: "700", value: 25 },
];
/**
 * `yellowDrift` represent the Green channel to use on `#FFxx00` to generate MyColorTheme.warning palette
 */
export function createNewTheme(fromColor: string, accentColor: string, yellowDrift: number) {
  if (!/^#[0-9A-F]{6}$/i.test(fromColor) || !/^#[0-9A-F]{6}$/i.test(accentColor)) {
    return {};
  }

  const argb = argbFromHex(fromColor);
  const neutralPalette = createPalette(PALETTE_NEUTRAL, argb);

  // Insert accentColor into neutral-500
  const neutral500 = neutralPalette.find((v) => v.name === "500");
  if (neutral500) {
    neutral500.value = TonalPalette.fromInt(argbFromHex(accentColor)).tone(50);
  }

  // Generate the selected yellow
  const yellow = new Color("srgb", [1, yellowDrift / 255.0, 0]);
  const yellowHex = yellow.toString({ format: "hex" });

  return {
    neutral: neutralPalette,
    link: createPalette(PALETTE_LINK, Blend.harmonize(argbFromHex(COLOR_REF_LINK), argb)),
    linkVisited: createPalette(PALETTE_LINK, Blend.harmonize(argbFromHex(COLOR_REF_LINK_VISITED), argb)),
    brand: createPalette(PALETTE_SEMANTIC,  TonalPalette.fromInt(argbFromHex(accentColor)).tone(50)),
    success: createPalette(PALETTE_SEMANTIC, Blend.harmonize(argbFromHex(COLOR_REF_SUCCESS), argb)),
    error: createPalette(PALETTE_SEMANTIC, Blend.harmonize(argbFromHex(COLOR_REF_ERROR), argb)),
    warning: createPalette(PALETTE_SEMANTIC, Blend.harmonize(argbFromHex(yellowHex), argb)),
    info: createPalette(PALETTE_SEMANTIC, Blend.harmonize(argbFromHex(COLOR_REF_INFO), argb)),
  };
}

export function argbToHex(argb: number) {
  return hexFromArgb(argb);
}

export function randomColorFromHueSaturation(hue: number, hueRange: number, saturation: number) {
  const h = Math.floor(Math.random() * (2 *  hueRange) + hue - hueRange)
  const s = saturation
  const l = Math.floor(Math.random() * 100)

  let color = new Color(`hsl(${h} ${s}% ${l}%)`)
  color = color.to("srgb")
  
  return color.toString({ format: "hex" })
}

export function randomColorFromHue(hue: number, hueRange: number) { 
  return randomColorFromHueSaturation(hue, hueRange, Math.floor(Math.random() * 100))
}

export function changeColorSaturation(colorHex: string, saturation: number) {
  let color = new Color(colorHex)
  color.set("hsl.s", saturation)
  color = color.to("srgb")
  
  return color.toString({ format: "hex" })
}

export function materialToneFromHex(colorHex: string, selectedTone: number) {
  const materialPalette = TonalPalette.fromInt(argbFromHex(colorHex));

  return argbToHex(materialPalette.tone(selectedTone));
}
