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
        <Input {...def("category")} />
        <Input {...def("brand")} />
      </Box>
      <Input {...def("description")} rows={4} />
    </Box>
  );
};

export default Default;
