import { Icon } from "@mui/material";

const iconData = {
  home: "bedroom_baby",
  portfolio: "face",
  defIcon: "do_not_disturb_off",
  open: "keyboard_tab",
  close: "keyboard_tab_rtl",
  logo: "auto_stories",
};

const Default = (props) => {
  const { name, ...other } = props;

  const icon = iconData[name] ? iconData[name] : iconData.defIcon;

  return (
    <Icon className="material-symbols-rounded" {...other}>
      {icon}
    </Icon>
  );
};

export { Default as Icon };
