import { useLang } from "@context";
import { Typography } from "@mui/material";
import { Trans } from "react-i18next";
import Tooltip from "../tooltip";

const Default = (props) => {
  const {
    name,
    caption,
    values,
    value,
    sx,
    langBase: langBaseProps,
    help,
    onlyText,
    ...other
  } = props;

  const lang = useLang();

  const langBase = langBaseProps ?? lang?.lang;

  const translate = !!name && (
    <Trans
      i18nKey={`${langBase ? `${langBase}.` : ""}${name}`}
      values={values ?? { value }}
    />
  );

  if (onlyText) {
    return translate;
  }

  const component = (
    <Typography
      sx={{
        "& strong": {
          px: 0.75,
          py: 0.25,
          backgroundColor: "action.disabled",
          borderRadius: 2,
        },
        ...sx,
      }}
      {...other}
    >
      {caption}
      {translate}
    </Typography>
  );
  if (help) {
    return <Tooltip help={help}>{component}</Tooltip>;
  }
  return component;
};

const useLocal = (langBase) => (props) =>
  <Default {...props} langBase={langBase} />;

export { Default as Text, useLocal };
