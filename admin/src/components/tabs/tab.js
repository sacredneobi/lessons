import Tab from "@mui/material/Tab";
import { Icon } from "../icon";
import { Box } from "../box";
import { areEqualObject } from "@utils/areRender";
import { memo } from "react";
import { Text } from "../text";

const Default = memo((props) => {
  const { sx, isError, name, langBase, ...other } = props;

  return (
    <Tab
      {...other}
      sx={{ p: 1, py: 0, minHeight: 32, ...sx }}
      label={
        isError ? (
          <Box defFlex row gap={0.25} ai sx={{ color: "warning.main" }}>
            <Icon name="warning" />
            <Text name={name} langBase={`${langBase}.tabs`} />
          </Box>
        ) : (
          <Text name={name} langBase={`${langBase}.tabs`} />
        )
      }
    />
  );
}, areEqualObject);

export default Default;
