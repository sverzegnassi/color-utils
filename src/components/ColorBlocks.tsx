import { Container, Stack, Typography } from "@mui/material";
import { MyColorStop, MyColorPalette } from "../lib/colors";
import { hexFromArgb, rgbaFromArgb } from "@material/material-color-utilities";

interface ColorBlockProps {
  colorStop: MyColorStop;
}

function ColorBlock(props: ColorBlockProps) {
  const rgba = rgbaFromArgb(props.colorStop.value);
  const hex = hexFromArgb(props.colorStop.value);

  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <div
        style={{
          width: "4rem",
          height: "4rem",
          backgroundColor: `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`,
          border: "1px solid rgb(128,128,128)",
        }}
      />
      <Typography>{props.colorStop.name}</Typography>
      <Typography>{hex}</Typography>
    </Stack>
  );
}

interface ColorBlocksProps {
  title: string;
  palette: MyColorPalette;
}

export function ColorBlocks(props: ColorBlocksProps) {
  return (
    <Container fixed>
      <Stack direction="column" sx={{ py: 3 }} spacing={2}>
        <Typography>{props.title}</Typography>
        <Stack direction="row" spacing={2}>
          {props.palette.map((color) => (
            <ColorBlock colorStop={color} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
