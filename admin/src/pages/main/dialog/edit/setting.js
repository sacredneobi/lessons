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
        <Input {...def("caption")} />
        <Input {...def("caption1")} />
        <Input {...def("caption2")} />
        <Input {...def("caption3")} />
      </Box>
    </Box>
  );
};

export default Default;
