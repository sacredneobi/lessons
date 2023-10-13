import { Box } from "@components";
import { addEvent, dispatch } from "@utils";
import { useEffect, useState } from "react";

const Default = () => {
  const [caption, setCaption] = useState("");

  useEffect(() => {
    return addEvent("route", (data) => {
      setCaption(data?.caption);
      dispatch("drawer");
    });
  }, []);

  return (
    <Box
      defFlex
      grow
      sx={{
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 4,
        p: 1,
      }}
    >
      {caption}
    </Box>
  );
};

export default Default;
