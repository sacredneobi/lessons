import { useLang } from "@context";
import { Typography } from "@mui/material";
import { Trans } from "react-i18next";

const Default = (props) => {
  const {
    name,
    caption,
    values,
    value,
    sx,
    langBase: langBaseProps,
    ...other
  } = props;

  const lang = useLang();

  const langBase = langBaseProps ?? lang?.lang;

  return (
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
};

const useLocal = (langBase) => (props) =>
  <Default {...props} langBase={langBase} />;

export { Default as Text, useLocal };
