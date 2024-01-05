import Stack from "@mui/material/Stack";
import { Divider } from "../divider";
import { Box } from "../box";

const Default = (props) => {
  return (
    <Stack
      direction="row"
      divider={
        <Box defFlex row>
          <Divider orientation="vertical" flexItem sx={{ my: 1 }} />
        </Box>
      }
      spacing={0.5}
      {...props}
    />
  );
};

export { Default as Stack };
