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
  clearInput: "close",
  logout: "digital_out_of_home",
  create: "add_circle",
  reload: "cached",
  file: "note_stack",
  loading: "downloading",
  broken: "broken_image",
  done: "done",
  error: "notification_important",
  closeAlert: "close",
  settings: "settings_account_box",
  themeLight: "wb_sunny",
  themeSystem: "settings_night_sight",
  themeDark: "dark_mode",
  warning: { name: "error", sx: { color: "warning.main", fontSize: 18 } },
};

const Default = (props) => {
  const { name, sx, ...other } = props;

  const icon = iconData[name] ?? iconData.defIcon;

  return (
    <Icon
      className="material-symbols-rounded"
      {...other}
      sx={{ ...icon.sx, ...sx }}
    >
      {icon?.name ?? icon}
    </Icon>
  );
};

export { Default as Icon };
