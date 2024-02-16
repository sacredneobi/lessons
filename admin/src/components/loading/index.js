import { CircularProgress } from "@mui/material";

const Default = (props) => {
  const { sx, ...other } = props;
  return (
    <CircularProgress
      size={40}
      sx={{
        color: "primary.contrastText",
        animationDuration: "3s",
        "& circle": {
          animationDuration: "8s",
        },
        ...sx,
      }}
      {...other}
    />
  );
};

export { Default as Loading };
