const { IconButton } = require("@mui/material");
const { Icon } = require("..");

const Default = (props) => {
  const { sxIcon, name, ...other } = props;
  return (
    <IconButton {...other}>
      <Icon name={name} sx={sxIcon} />
    </IconButton>
  );
};

export { Default as IconButton };
