import { Button } from "@mui/material";
import { Box } from "../box";
import { Text } from "../text";
import { Icon } from "../icon";

const Default = (props) => {
  const {
    name,
    sxBox,
    sxText,
    propsBox,
    propsText,
    propsIcon,
    sxIcon,
    langBase,
    icon,
    ...other
  } = props;

  return (
    <Button variant="contained" {...other}>
      <Box defFlex center row gap {...propsBox} sx={sxBox}>
        {icon && <Icon name={icon} {...propsIcon} sx={sxIcon} />}
        {name && (
          <Text name={name} langBase={langBase} {...propsText} sx={sxText} />
        )}
        {other.children}
      </Box>
    </Button>
  );
};

Default.mui = Button;

const Delete = (props) => {
  const { name, langBase, ...other } = props;

  return (
    <Default
      variant="contained"
      color="warning"
      name="delete"
      langBase={langBase ?? "global"}
      {...other}
    />
  );
};

const MenuButton = (props) => {
  return <Default variant="text" {...props} />;
};

export { Default as Button, Delete as ButtonDelete, MenuButton };
