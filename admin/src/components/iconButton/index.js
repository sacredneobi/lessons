import { dispatchDelete, dispatchEdit } from "@utils";
import { IconButton } from "@mui/material";
import { Icon } from "../icon";

const Default = (props) => {
  const { sxIcon, name, ...other } = props;
  return (
    <IconButton {...other}>
      <Icon name={name} sx={sxIcon} />
    </IconButton>
  );
};

const Edit = (props) => {
  const { langBase, data } = props;

  return (
    <Default
      name="edit"
      onClick={() => {
        dispatchEdit(langBase, data);
      }}
      sxIcon={{ fontSize: 18 }}
    />
  );
};

const Delete = (props) => {
  const { langBase, data } = props;

  return (
    <Default
      name="delete"
      onClick={() => {
        dispatchDelete(langBase, data);
      }}
      sxIcon={{ fontSize: 18, color: "warning.main" }}
    />
  );
};

export {
  Default as IconButton,
  Edit as IconButtonEdit,
  Delete as IconButtonDelete,
};
