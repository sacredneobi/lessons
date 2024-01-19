import { Box } from "../box";

const Default = (props) => {
  const { sx, ...other } = props;

  return (
    <Box
      defFlex
      grow
      sx={{ px: 1, overflowY: "auto", overflowX: "hidden", height: 2, ...sx }}
      {...other}
    />
  );
};

export { Default as DialogContent };
