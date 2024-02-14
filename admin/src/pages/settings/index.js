import { Box, ButtonGroup, Icon, Text } from "@components";
import { dispatch, useAction, useDef } from "@utils";
import { useCallback, useState } from "react";

const Default = () => {
  const [data, setData] = useState({
    theme: localStorage.getItem("theme") ?? "system",
  });

  const handleOnSave = useCallback((name, value) => {
    if (name === "theme") {
      localStorage.setItem(name, value);
      dispatch(name, value);
    }
    return value;
  }, []);

  const handleOnChange = useAction(setData, handleOnSave);
  const def = useDef(data, handleOnChange);

  return (
    <Box sx={{ borderRadius: 2 }}>
      <ButtonGroup
        {...def("theme")}
        items={[
          {
            id: "light",
            caption: (
              <Box defFlex gap ai>
                <Icon name="themeLight" />
                <Text caption="Light" />
              </Box>
            ),
          },
          {
            id: "system",
            caption: (
              <Box defFlex gap ai>
                <Icon name="themeSystem" />
                <Text caption="System" />
              </Box>
            ),
          },
          {
            id: "dark",
            caption: (
              <Box defFlex gap ai>
                <Icon name="themeDark" />
                <Text caption="Dark" />
              </Box>
            ),
          },
        ]}
      />
    </Box>
  );
};

export { Default as PageSettings };
