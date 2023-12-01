import Tab from "@mui/material/Tab";

const Default = (props) => {
  const { sx, ...other } = props;

  return <Tab {...other} sx={{ p: 1, py: 0, minHeight: 32, ...sx }} />;
};

export default Default;
