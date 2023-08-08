import Container from "@mui/material/Container";
import { MyColorTheme } from "../lib/colors";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { apcaContrast, hexFromTheme, wcagContrast } from "../lib/utils";

interface ExampleProps {
  theme: MyColorTheme;
}

export function Examples(props: ExampleProps) {
  const { theme } = props;

  const colors = {
    light: {
      bg: hexFromTheme(theme, "neutral", "100"),
      second_bg: hexFromTheme(theme, "neutral", "300"),
      border: hexFromTheme(theme, "neutral", "700") + "66",
      text: hexFromTheme(theme, "neutral", "950"),
      linkText: hexFromTheme(theme, "link", "950"),
      visitedLinkText: hexFromTheme(theme, "linkVisited", "950"),
      accent: hexFromTheme(theme, "neutral", "500"),
    },
    dark: {
      bg: hexFromTheme(theme, "neutral", "900"),
      second_bg: hexFromTheme(theme, "neutral", "700"),
      border: hexFromTheme(theme, "neutral", "300") + "66",
      text: hexFromTheme(theme, "neutral", "50"),
      linkText: hexFromTheme(theme, "link", "50"),
      visitedLinkText: hexFromTheme(theme, "linkVisited", "50"),
      accent: hexFromTheme(theme, "neutral", "500"),
    },
  };

  return (
    <>
      <Container fixed sx={{ py: 4 }}>
        <Grid container spacing={2}>
          <Grid xs={6} sx={{ p: 4, backgroundColor: colors.light.bg }}>
            <div
              style={{
                padding: "2rem",
                backgroundColor: colors.light.second_bg,
                border: `1px solid ${colors.light.border}`,
                borderRadius: ".5rem",
              }}
            >
              <p style={{ color: colors.light.text }}>Light theme</p>
              <p style={{ color: colors.light.text }}>WCAG {wcagContrast(colors.light.second_bg, colors.light.text)}</p>
              <p style={{ color: colors.light.text }}>1st BG APCA {apcaContrast(colors.light.text, colors.light.bg)}</p>
              <p style={{ color: colors.light.text }}>
                2nd BG APCA {apcaContrast(colors.light.text, colors.light.second_bg)}
              </p>
              <div style={{ backgroundColor: colors.light.accent, height: "2px" }}></div>
              <p style={{ color: colors.light.text }}>
                ACCENT WCAG {wcagContrast(colors.light.second_bg, colors.light.accent)}
              </p>
              <p style={{ color: colors.light.text }}>
                ACCENT APCA {apcaContrast(colors.light.accent, colors.light.second_bg)}
              </p>
            </div>
          </Grid>

          <Grid xs={6} sx={{ p: 4, backgroundColor: colors.dark.bg }}>
            <div
              style={{
                padding: "2rem",
                backgroundColor: colors.dark.second_bg,
                border: `1px solid ${colors.dark.border}`,
                borderRadius: ".5rem",
              }}
            >
              <p style={{ color: colors.dark.text }}>Dark theme</p>
              <p style={{ color: colors.dark.text }}>WCAG {wcagContrast(colors.dark.second_bg, colors.dark.text)}</p>
              <p style={{ color: colors.dark.text }}>1st BG APCA {apcaContrast(colors.dark.text, colors.dark.bg)}</p>
              <p style={{ color: colors.dark.text }}>
                2nd BG APCA {apcaContrast(colors.dark.text, colors.dark.second_bg)}
              </p>
              <div style={{ backgroundColor: colors.dark.accent, height: "2px" }}></div>
              <p style={{ color: colors.dark.text }}>
                ACCENT WCAG {wcagContrast(colors.dark.second_bg, colors.dark.accent)}
              </p>
              <p style={{ color: colors.dark.text }}>
                ACCENT APCA {apcaContrast(colors.dark.accent, colors.dark.second_bg)} (min: -30)
              </p>
            </div>
          </Grid>

          <Grid xs={6} sx={{ p: 2, backgroundColor: colors.light.bg }}>
            <div
              style={{
                padding: "2rem",
                backgroundColor: colors.light.second_bg,
                border: `1px solid ${colors.light.border}`,
                borderRadius: ".5rem",
              }}
            >
              <p style={{ color: colors.light.text }}>Link on light</p>
              <Grid container sx={{ px: 1 }}>
                <Grid xs={6}>
                  <p style={{ color: colors.light.linkText, fontWeight: 600, textDecoration: "underline" }}>
                    I'm a Link
                  </p>
                  <p style={{ color: colors.light.text }}>
                    w/ BG WCAG {wcagContrast(colors.light.second_bg, colors.light.linkText)}
                  </p>
                  <p style={{ color: colors.light.text }}>
                    w/ TEXT WCAG {wcagContrast(colors.light.text, colors.light.linkText)}
                  </p>
                  <p style={{ color: colors.light.text }}>
                    w/ BG APCA {apcaContrast(colors.light.linkText, colors.light.second_bg)}
                  </p>
                </Grid>
                <Grid xs={6}>
                  <p style={{ color: colors.light.visitedLinkText, fontWeight: 600, textDecoration: "underline" }}>
                    I'm a Visited Link
                  </p>
                  <p style={{ color: colors.light.text }}>
                    w/ BG WCAG {wcagContrast(colors.light.second_bg, colors.light.linkText)}
                  </p>
                  <p style={{ color: colors.light.text }}>
                    w/ TEXT WCAG {wcagContrast(colors.light.text, colors.light.visitedLinkText)}
                  </p>
                  <p style={{ color: colors.light.text }}>
                    w/ BG APCA {apcaContrast(colors.light.visitedLinkText, colors.light.second_bg)}
                  </p>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid xs={6} sx={{ p: 2, backgroundColor: colors.dark.bg }}>
            <div
              style={{
                padding: "2rem",
                backgroundColor: colors.dark.second_bg,
                border: `1px solid ${colors.dark.border}`,
                borderRadius: ".5rem",
              }}
            >
              <p style={{ color: colors.dark.text }}>Link on dark</p>
              <Grid container sx={{ px: 1 }}>
                <Grid xs={6}>
                  <p style={{ color: colors.dark.linkText, fontWeight: 600, textDecoration: "underline" }}>
                    I'm a Link
                  </p>
                  <p style={{ color: colors.dark.text }}>
                    w/ BG WCAG {wcagContrast(colors.dark.second_bg, colors.dark.linkText)}
                  </p>
                  <p style={{ color: colors.dark.text }}>
                    w/ TEXT WCAG {wcagContrast(colors.dark.text, colors.dark.linkText)}
                  </p>
                  <p style={{ color: colors.dark.text }}>
                    w/ BG APCA {apcaContrast(colors.dark.linkText, colors.dark.second_bg)}
                  </p>
                </Grid>
                <Grid xs={6}>
                  <p style={{ color: colors.dark.visitedLinkText, fontWeight: 600, textDecoration: "underline" }}>
                    I'm a Visited Link
                  </p>
                  <p style={{ color: colors.dark.text }}>
                    w/ BG WCAG {wcagContrast(colors.dark.second_bg, colors.dark.linkText)}
                  </p>
                  <p style={{ color: colors.dark.text }}>
                    w/ TEXT WCAG {wcagContrast(colors.dark.text, colors.dark.visitedLinkText)}
                  </p>
                  <p style={{ color: colors.dark.text }}>
                    w/ BG APCA {apcaContrast(colors.dark.visitedLinkText, colors.dark.second_bg)}
                  </p>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container fixed sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {["success", "error", "warning", "info"].map((intent) => {
            return (
              <>
                <Grid xs={6} sx={{ p: 2, backgroundColor: colors.light.bg }}>
                  <div
                    style={{
                      padding: "2rem",
                      backgroundColor: hexFromTheme(theme, intent, "300"),
                      border: `2px solid ${hexFromTheme(theme, intent, "500")}`,
                      borderRadius: "2px",
                    }}
                  >
                    <p
                      style={{
                        color: hexFromTheme(theme, intent, "700"),
                      }}
                    >
                      This is {intent}
                    </p>
                    <p style={{ color: colors.light.text }}>
                      TEXT WCAG {wcagContrast(hexFromTheme(theme, intent, "300"), hexFromTheme(theme, intent, "700"))}
                    </p>
                    <p style={{ color: colors.light.text }}>
                      TEXT APCA {apcaContrast(hexFromTheme(theme, intent, "700"), hexFromTheme(theme, intent, "300"))}
                    </p>
                    <p style={{ color: colors.light.text }}>
                      BORDER INNER WCAG{" "}
                      {wcagContrast(hexFromTheme(theme, intent, "500"), hexFromTheme(theme, intent, "300"))}
                    </p>
                    <p style={{ color: colors.light.text }}>
                      BORDER 2nd BG WCAG {wcagContrast(hexFromTheme(theme, intent, "500"), colors.light.second_bg)}
                    </p>
                  </div>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Container>

      <Container fixed sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {["success", "error", "warning", "info"].map((intent) => {
            return (
              <>
                <Grid xs={3} sx={{ p: 2, backgroundColor: colors.dark.bg }}>
                  <div
                    style={{
                      padding: "2rem",
                      backgroundColor: hexFromTheme(theme, intent, "300"),
                    }}
                  >
                    <p
                      style={{
                        color: hexFromTheme(theme, intent, "700"),
                      }}
                    >
                      This is {intent}
                    </p>
                  </div>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
