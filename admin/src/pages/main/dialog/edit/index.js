import { useCallback, useState } from "react";

const { Box, Input } = require("@components");

const Default = (props) => {
  const [data, setData] = useState(null);

  const handleOnChange = useCallback(
    (name) => (value) => {
      setData((prev) => {
        if (!prev) {
          prev = {};
        }
        prev[name] = value;
        return { ...prev };
      });
    },
    []
  );

  return (
    <Box defFlex gap sx={{ pt: 0.75 }}>
      <Box defFlex row gap>
        <Input
          name="caption"
          caption="Caption"
          value={data?.caption}
          onChange={handleOnChange}
          clear
          sx={{ flexBasis: "50%" }}
        />
        <Input
          name="caption1"
          caption="Caption"
          value={data?.caption1}
          onChange={handleOnChange}
          sx={{ flexBasis: "50%" }}
        />
      </Box>
      <Box defFlex row gap>
        <Input
          name="caption2"
          caption="Caption"
          value={data?.caption2}
          onChange={handleOnChange}
          sx={{ flexBasis: "50%" }}
        />
        <Input
          name="caption3"
          caption="Caption"
          value={data?.caption3}
          onChange={handleOnChange}
          clear
          sx={{ flexBasis: "50%" }}
        />
      </Box>
    </Box>
  );
};

export default Default;
