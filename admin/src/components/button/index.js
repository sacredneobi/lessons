import { Button } from "@mui/material";
import { Box } from "../box";
import { Text } from "../text";

const Default = (props) => {
  const { name, caption, sxBox, sxText, propsBox, propsText, ...other } = props;

  return (
    <Button variant="contained" {...other}>
      <Box defFlex center row gap {...propsBox} sx={{ ...sxBox }}>
        <Text
          caption={caption}
          {...propsText}
          sx={{ fontSize: 12, ...sxText }}
        />
        {other.children}
      </Box>
    </Button>
  );
};

const Delete = (props) => {
  const { name, caption = "delete", ...other } = props;

  return (
    <Default variant="contained" color="warning" caption={caption} {...other} />
  );
};

const MenuButton = (props) => {
  return <Default variant="text" {...props} />;
};

export { Default as Button, Delete as ButtonDelete, MenuButton };
