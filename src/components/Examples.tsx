import Container from "@mui/material/Container";
import { MyColorPalette, MyColorTheme, argbToHex } from "../lib/colors";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function hexFromTheme(theme: MyColorTheme, palette: string, stopName: string) {
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

interface ExamplesProps {
  theme: MyColorTheme;
}

export function Examples(props: ExamplesProps) {
  const { theme } = props;

  return (
    <>
      <Container fixed sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {/** Light theme */}
          <Grid
            xs="auto"
            sx={{
              p: 4,
              backgroundColor: hexFromTheme(theme, "neutral", "100"),
            }}
          >
            <div
              style={{
                padding: "2rem",
                backgroundColor: hexFromTheme(theme, "neutral", "300"),
                border: `1px solid ${hexFromTheme(theme, "neutral", "700")}66`,
                borderRadius: ".5rem"
              }}
            >
              <p style={{ color: hexFromTheme(theme, "neutral", "950") }}>Light theme</p>
              <div style={{ backgroundColor: hexFromTheme(theme, "neutral", "500"), height: "2px" }}></div>
            </div>
          </Grid>

          {/** Dark Theme */}
          <Grid
            xs="auto"
            sx={{
              p: 4,
              backgroundColor: hexFromTheme(theme, "neutral", "900"),
            }}
          >
            <div
              style={{
                padding: "2rem",
                backgroundColor: hexFromTheme(theme, "neutral", "700"),
                border: `1px solid ${hexFromTheme(theme, "neutral", "300")}66`,
                borderRadius: ".5rem"
              }}
            >
              <p style={{ color: hexFromTheme(theme, "neutral", "50") }}>Dark theme</p>
              <div style={{ backgroundColor: hexFromTheme(theme, "neutral", "500"), height: "2px" }}></div>
            </div>
          </Grid>

          {/** Link on light */}
          <Grid
            xs="auto"
            sx={{
              p: 2,
              backgroundColor: hexFromTheme(theme, "neutral", "100"),
            }}
          >
            <div
              style={{
                padding: "2rem",
                backgroundColor: hexFromTheme(theme, "neutral", "300"),
                border: `1px solid ${hexFromTheme(theme, "neutral", "700")}66`,
                borderRadius: ".5rem"
              }}
            >
              <p style={{ color: hexFromTheme(theme, "neutral", "950") }}>Link on light</p>
              <p style={{ color: hexFromTheme(theme, "link", "950") }}>I'm a link</p>
            </div>
          </Grid>

          {/** Link on dark */}
          <Grid
            xs="auto"
            sx={{
              p: 2,
              backgroundColor: hexFromTheme(theme, "neutral", "900"),
            }}
          >
            <div
              style={{
                padding: "2rem",
                backgroundColor: hexFromTheme(theme, "neutral", "700"),
                border: `1px solid ${hexFromTheme(theme, "neutral", "300")}66`,
                borderRadius: ".5rem"
              }}
            >
              <p style={{ color: hexFromTheme(theme, "neutral", "50") }}>Link on dark</p>
              <p style={{ color: hexFromTheme(theme, "link", "50") }}>I'm a link</p>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/** Semantic on light */}
      <Container fixed sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {["success", "error", "warning", "info"].map((intent) => {
            return (
              <>
                <Grid
                  xs="auto"
                  sx={{
                    p: 2,
                    backgroundColor: hexFromTheme(theme, "neutral", "100"),
                  }}
                >
                  <div
                    style={{
                      padding: "2rem",
                      backgroundColor: hexFromTheme(theme, intent, "300"),
                      border: `2px solid ${hexFromTheme(theme, intent, "500")}`,
                      borderRadius: "2px"
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

      {/** Semantic on dark */}
      <Container fixed sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {["success", "error", "warning", "info"].map((intent) => {
            return (
              <>
                <Grid
                  xs="auto"
                  sx={{
                    p: 2,
                    backgroundColor: hexFromTheme(theme, "neutral", "900"),
                  }}
                >
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
