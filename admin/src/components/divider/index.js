import { Divider } from "@mui/material";

const Default = (props) => {
  return <Divider {...props} />;
};

const Vertical = (props) => {
  const { sx, ...other } = props;
  return (
    <Default
      orientation="vertical"
      flexItem
      sx={{ mr: 0.5, my: 0.5, ...sx }}
      {...other}
    />
  );
};

export { Default as Divider, Vertical as DividerVertical };
