import { Box } from "../box";

const iconData = {
  home: "bedroom_baby",
  portfolio: "face",
  defIcon: "do_not_disturb_off",
  open: "keyboard_tab",
  close: "keyboard_tab_rtl",
  logo: "change_history",
};

const Icon = (props) => {
  const { name, sx, ...other } = props;

  const icon = iconData[name] ? iconData[name] : iconData.defIcon;

  return (
    <Box
      className="material-symbols-rounded"
      sx={{ height: 24, width: 24, ...sx }}
      {...other}
    >
      {icon}
    </Box>
  );
};

export { Icon };
