import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { materialToneFromHex, randomColorFromHue } from "../lib/colors";

function RandomNeutralColorPage() {
  const [lightColorStop, setLightColorStop] = useState(98);
  const [darkColorStop, setDarkColorStop] = useState(10);
  const [hue, setHue] = useState("red");

  const [randomColor, setRandomColor] = useState("#000");
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");

  const huesList = [
    { name: "red", value: 0 },
    { name: "yellow", value: 60 },
    { name: "green", value: 120 },
    { name: "cyan", value: 180 },
    { name: "blue", value: 240 },
    { name: "magenta", value: 300 },
  ];

  const generateRandomColor = () => {
    const hueValue = huesList.find((e) => e.name === hue)?.value || 0;
    setRandomColor(randomColorFromHue(hueValue, 30));
  };

  useEffect(() => generateRandomColor(), [hue]);

  useEffect(() => {
    setLightColor(materialToneFromHex(randomColor, lightColorStop));
    setDarkColor(materialToneFromHex(randomColor, darkColorStop));
  }, [randomColor, lightColorStop, darkColorStop]);

  return (
    <>
      <Container fixed sx={{ my: 12 }}>
        <Stack direction="row" spacing={2}>
          <div>
            <Typography gutterBottom>Light Color Stop: {lightColorStop}</Typography>
            <Slider value={lightColorStop} min={0} max={100} onChange={(_e, value) => setLightColorStop(value)} />
          </div>
          <div>
            <Typography gutterBottom>Dark Color Stop: {darkColorStop}</Typography>
            <Slider value={darkColorStop} min={0} max={100} onChange={(_e, value) => setDarkColorStop(value)} />
          </div>
          <FormControl>
            <FormLabel id="basecolor-group-label">Base Color: {hue}</FormLabel>
            <RadioGroup
              aria-labelledby="basecolor-group-label"
              name="basecolor-group"
              value={hue}
              onChange={(_e, value) => setHue(value)}
            >
              <Grid container spacing={0.5}>
                {huesList.map((value) => (
                  <Grid xs={2}>
                    <FormControlLabel
                      value={value.name}
                      control={<Radio />}
                      label={value.name}
                      key={`basecolor-group--item-${value.name}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => generateRandomColor()}>
            Generate Random Color
          </Button>
        </Stack>
      </Container>

      <Container fixed>
        <Grid container spacing={0}>
          <Grid
            sx={{ minHeight: "50vh" }}
            style={{
              display: "grid",
              placeContent: "center",
              color: darkColor,
              backgroundColor: lightColor,
            }}
            xs={6}
          >
            {lightColor}
          </Grid>
          <Grid
            sx={{ minHeight: "50vh" }}
            style={{
              display: "grid",
              placeContent: "center",
              color: lightColor,
              backgroundColor: darkColor,
            }}
            xs={6}
          >
            {darkColor}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default RandomNeutralColorPage;
