import { Box, Input } from "@components";

const Default = (props) => {
  const { def } = props;

  return (
    <Box defFlex gap sx={{ pt: 0.75 }}>
      <Input {...def("caption")} />
      <Box defGrid gap sx={{ gridTemplateColumns: "1fr 1fr" }}>
        <Input {...def("article")} />
        <Input {...def("color")} />
      </Box>
      <Input {...def("description")} rows={4} />
    </Box>
  );
};

export default Default;
