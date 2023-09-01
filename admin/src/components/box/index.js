import { Box } from "@mui/material";

const Default = (props) => {
  const { defFlex, ai, jc, center, row, gap, grow, sx, ...other } = props;

  const newSx = {};

  if (defFlex) {
    newSx.display = "flex";
    newSx.flexDirection = "column";
  }

  if (ai) {
    newSx.alignItems = ai === true ? "center" : ai;
  }

  if (jc) {
    newSx.justifyContent = jc === true ? "center" : jc;
  }

  if (center) {
    newSx.alignItems = "center";
    newSx.justifyContent = "center";
  }

  if (row) {
    newSx.flexDirection = "row";
  }

  if (gap) {
    newSx.gap = gap === true ? 1 : parseFloat(gap) ? parseFloat(gap) : gap;
  }

  if (grow) {
    newSx.flexGrow =
      grow === true ? 1 : parseFloat(grow) ? parseFloat(grow) : grow;
  }

  return <Box sx={{ ...newSx, ...sx }} {...other} />;
};

export { Default as Box };
