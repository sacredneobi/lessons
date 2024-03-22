import { Tooltip } from "@mui/material";
import { Text } from "..";

const Default = (props) => {
  const { help, sx, ...other } = props;

  let caption;

  if (help?.name) {
    caption = <Text name={`help.${help.name}`} langBase={help?.langBase} />;
  } else {
    caption = help;
  }

  return (
    <Tooltip
      title={caption}
      open={help?.open}
      arrow
      placement="top"
      disableInteractive
      PopperProps={{ sx: { "& .MuiTooltip-tooltip": { borderRadius: 2 } } }}
      {...other}
    />
  );
};

export default Default;
