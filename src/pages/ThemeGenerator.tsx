import { useEffect, useState } from "react";
import { ColorBlocks } from "../components/ColorBlocks";
import { Examples } from "../components/Examples";
import { MyColorTheme, createNewTheme } from "../lib/colors";
import { exportTailwindConfig } from "../lib/utils";
import { Container, TextField, Stack, Typography, Slider, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function ThemeGeneratorPage() {
  let [startColor, setStartColor] = useState("#131B27");
  let [accentColor, setAccentColor] = useState("#C75030");
  let [yellowDrift, setYellowDrift] = useState(180);
  let [generatedTheme, setGeneratedTheme] = useState<MyColorTheme>(
    createNewTheme(startColor, accentColor, yellowDrift)
  );

  useEffect(() => {
    setGeneratedTheme(createNewTheme(startColor, accentColor, yellowDrift));
  }, [startColor, accentColor, yellowDrift]);

  return (
    <>
      <Container fixed>
        <Stack direction="row" spacing={2} sx={{ my: 12 }}>
          <TextField
            label="Neutral color HEX"
            variant="outlined"
            value={startColor}
            onChange={(e) => setStartColor(e.target.value)}
          />
          <TextField
            label="Accent color HEX"
            variant="outlined"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
          />
          <div>
            <Typography gutterBottom>Yellow drift: {yellowDrift}</Typography>
            <Slider value={yellowDrift} min={125} max={255} onChange={(_e, value) => setYellowDrift(value as number)} />
          </div>
          <Button onClick={() => exportTailwindConfig(generatedTheme)}>Export Tailwind Config</Button>
        </Stack>
      </Container>

      <Container fixed>
        <Grid container spacing={2} sx={{ my: 12 }}>
          {Object.keys(generatedTheme).map((key, i) => {
            return (
              <Grid xs="auto">
                <ColorBlocks title={key} palette={Object.values(generatedTheme)[i]} />
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Container>
        <Examples theme={generatedTheme} />
      </Container>
    </>
  );
}

export default ThemeGeneratorPage;
