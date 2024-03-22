import { Box } from "@mui/material";
import Tooltip from "../tooltip";

const Default = (props) => {
  const {
    defFlex,
    defGrid,
    ai,
    jc,
    jc_sp,
    center,
    row,
    gap,
    grow,
    sx: sxProps,
    strong,
    help,
    ...other
  } = props;

  const sx = { ...sxProps };

  if (defFlex) {
    sx.display = "flex";
    sx.flexDirection = "column";
  }

  if (defGrid) {
    sx.display = "grid";
  }

  if (ai) {
    sx.alignItems = ai === true ? "center" : ai;
  }

  if (jc) {
    sx.justifyContent = jc === true ? "center" : jc;
  }

  if (jc_sp) {
    sx.justifyContent = "space-between";
  }

  if (center) {
    sx.alignItems = "center";
    sx.justifyContent = "center";
  }

  if (row) {
    sx.flexDirection = "row";
  }

  if (gap) {
    sx.gap = gap === true ? 1 : parseFloat(gap) ? parseFloat(gap) : gap;
  }

  if (grow) {
    sx.flexGrow =
      grow === true ? 1 : parseFloat(grow) ? parseFloat(grow) : grow;
  }

  if (strong) {
    sx.px = 1;
    sx.py = 0.25;
    sx.backgroundColor = "background.strong";
    sx.borderRadius = 1;
    sx.cursor = "pointer";
  }

  const component = <Box sx={sx} {...other} />;

  if (help) {
    return <Tooltip help={help}>{component}</Tooltip>;
  }
  return component;
};

export { Default as Box };
