import { Box, Input } from "@components";
import { useAction } from "@utils";
import { useState } from "react";

const Default = (props) => {
  const [data, setData] = useState(null);
  const handleOnChange = useAction(setData);

  const def = (name) => ({
    name,
    caption: name,
    value: data?.[name],
    onChange: handleOnChange,
    clear: true,
  });

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
