import { Icon } from "@mui/material";

const iconData = {
  home: "bedroom_baby",
  portfolio: "face",
  defIcon: "do_not_disturb_off",
  open: "keyboard_tab",
  close: "keyboard_tab_rtl",
  logo: "auto_stories",
  good: "dinner_dining",
  main: "home_work",
  order: "receipt_long",
  setting: "tune",
  filter: "filter_alt",
  edit: "stylus",
  delete: "delete",
};

const Default = (props) => {
  const { name, ...other } = props;

  // console.log(props);

  const icon = iconData[name] ? iconData[name] : iconData.defIcon;

  return (
    <Icon className="material-symbols-rounded" {...other}>
      {icon}
    </Icon>
  );
};

export { Default as Icon };
