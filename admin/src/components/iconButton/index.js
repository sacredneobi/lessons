import { dispatch, dispatchDelete, dispatchEdit } from "@utils";
import { IconButton } from "@mui/material";
import { Icon } from "../icon";
import { useLang } from "@context/lang";
import Tooltip from "../tooltip";

const Default = (props) => {
  const { sxIcon, name, help, ...other } = props;
  const component = (
    <IconButton {...other}>
      <Icon name={name} sx={sxIcon} />
    </IconButton>
  );

  if (help) {
    return <Tooltip help={help}>{component}</Tooltip>;
  }
  return component;
};

const Edit = (props) => {
  const { langBase: langBaseProps, data, ...other } = props;

  const lang = useLang();

  const langBase = langBaseProps ?? lang?.lang;

  return (
    <Default
      name="edit"
      onClick={() => {
        dispatchEdit(langBase, data);
      }}
      sxIcon={{ fontSize: 18 }}
      help={{ name: "edit" }}
      {...other}
    />
  );
};

const Delete = (props) => {
  const { langBase: langBaseProps, data, ...other } = props;

  const lang = useLang();

  const langBase = langBaseProps ?? lang?.lang;

  return (
    <Default
      name="delete"
      onClick={() => {
        dispatchDelete(langBase, data);
      }}
      sxIcon={{ fontSize: 18, color: "warning.main" }}
      help={{ name: "delete" }}
      {...other}
    />
  );
};

const Create = (props) => {
  const { langBase: langBaseProps, data, ...other } = props;

  const lang = useLang();

  const langBase = langBaseProps ?? lang?.lang;

  return (
    <Default
      name="create"
      onClick={() => {
        dispatchEdit(langBase, data);
      }}
      sxIcon={{ fontSize: 18, color: "warning.main" }}
      help={{ name: "create" }}
      {...other}
    />
  );
};

const Reload = (props) => {
  const { langBase: langBaseProps, ...other } = props;

  const lang = useLang();

  const langBase = langBaseProps ?? lang?.lang;

  return (
    <Default
      name="reload"
      onClick={() => {
        dispatch("reload", { name: langBase });
      }}
      sxIcon={{ fontSize: 18, color: "warning.main" }}
      help={{ name: "reload" }}
      {...other}
    />
  );
};

export {
  Default as IconButton,
  Edit as IconButtonEdit,
  Delete as IconButtonDelete,
  Create as IconButtonCreate,
  Reload as IconButtonReload,
};
