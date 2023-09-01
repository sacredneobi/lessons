import { Typography } from "@mui/material";

const Default = (props) => {
  const { name, caption, sx, ...other } = props;

  return (
    <Typography variant="h5" sx={{ ...sx }} {...other}>
      {caption}
    </Typography>
  );
};

export { Default as Text };
