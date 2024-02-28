import { Typography } from "@mui/material";
import { Trans } from "react-i18next";

const Default = (props) => {
  const { name, caption, values, value, sx, langBase, ...other } = props;

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
