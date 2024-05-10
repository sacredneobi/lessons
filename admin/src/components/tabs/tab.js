import Tab from "@mui/material/Tab";
import { Icon } from "../icon";
import { Box } from "../box";
import { areEqualObject } from "@utils/areRender";
import { memo } from "react";
import { Text } from "../text";
import { alpha } from "@mui/material";

const Default = memo((props) => {
  const { sx, isError, name, langBase, ...other } = props;

  return (
    <Tab
      {...other}
      sx={{
        p: 1,
        py: 0,
        minHeight: 32,
        "&.Mui-selected": isError && {
          backgroundColor: "warning.main",
          background: ({ palette }) =>
            `linear-gradient(0deg, ${alpha(
              palette.warning.main,
              0.18
            )} 0%, #00000000 100%)`,
        },
        ...sx,
      }}
      label={
        isError ? (
          <Box defFlex row gap ai sx={{ color: "warning.main" }}>
            <Icon name="warning" />
            <Text name={name} />
          </Box>
        ) : (
          <Text name={name} />
        )
      }
    />
  );
}, areEqualObject);

export default Default;
