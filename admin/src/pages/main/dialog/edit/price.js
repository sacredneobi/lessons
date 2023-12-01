import { Box, Input } from "@components";

const Default = (props) => {
  const { def } = props;

  return (
    <Box defFlex gap sx={{ pt: 0.75 }}>
      <Box
        defGrid
        gap
        sx={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}
      >
        <Input {...def("price")} />
      </Box>
    </Box>
  );
};

export default Default;
