import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { MyColorTheme, createNewTheme } from "./lib/colors";
import { ColorBlocks } from "./components/ColorBlocks";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Examples } from "./components/Examples";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function App() {
  let [startColor, setStartColor] = useState("#131B27");
  let [generatedTheme, setGeneratedTheme] = useState<MyColorTheme>(createNewTheme(startColor));

  useEffect(() => {
    setGeneratedTheme(createNewTheme(startColor));
  }, [startColor]);

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

export default App;
