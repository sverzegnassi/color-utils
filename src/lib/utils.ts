import Color from "colorjs.io";
import { MyColorTheme, MyColorPalette, argbToHex, MyColorStop } from "./colors";

export function hexFromTheme(theme: MyColorTheme, palette: string, stopName: string) {
  try {
    const index = Object.keys(theme).findIndex((k) => k === palette);

    const indexedPalette: MyColorPalette = Object.values(theme)[index];

    const colorStop = indexedPalette.find((colorStop) => colorStop.name === stopName);

    if (colorStop) {
      return argbToHex(colorStop.value);
    } else {
      return "#fff";
    }
  } catch (error) {
    return "#fff";
  }
}

export function wcagContrast(colorA: string, colorB: string) {
  let a = new Color(colorA);
  let b = new Color(colorB);

  return a.contrast(b, "WCAG21").toFixed(2);
}

export function apcaContrast(textColor: string, backgroundColor: string) {
  let text = new Color(textColor);
  let bg = new Color(backgroundColor);

  return bg.contrast(text, "APCA").toFixed(2);
}

export function exportTailwindConfig(generatedTheme: MyColorTheme): void {
  let twTheme = "{\n\u0020\u0020colors: {\n";

  const palettes = Object.values(generatedTheme);
  Object.keys(generatedTheme).forEach((key, index) => {
    twTheme += `\u0020\u0020\u0020\u0020'${key}': {\n`;

    Object.values<MyColorStop>(palettes[index]).forEach((v) => {
      twTheme += `\u0020\u0020\u0020\u0020\u0020\u0020'${v.name}': '${argbToHex(v.value)}',\n`;
    });

    twTheme += `\u0020\u0020\u0020\u0020},\n`;
  });

  twTheme += `\u0020\u0020}\n}`;

  navigator.clipboard.writeText(twTheme);

  alert(`Copied!\n\n${twTheme}`);
}
