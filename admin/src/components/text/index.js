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
    ...other
  } = props;

  const lang = useLang();

  const langBase = langBaseProps ?? lang?.lang;

  const component = (
    <Typography sx={{ ...sx }} {...other}>
      {caption}
      {!!name && (
        <Trans
          i18nKey={`${langBase ? `${langBase}.` : ""}${name}`}
          values={values ?? { value }}
        />
      )}
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
