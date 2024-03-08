import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { addEvent, dispatch } from "@utils";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { useLang } from "@context/lang";
import { Text } from "../text";

const Delete = (props) => {
  const { langBase: langBaseProps, useData } = props;

  const lang = useLang();

  const langBase = lang?.lang ?? langBaseProps;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(
    () =>
      addEvent(`${langBase}.dialog.delete`, (detail) => {
        setData(detail);
        setOpen(true);
      }),
    [langBase]
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnOk = () => {
    if (data?.id) {
      if (typeof useData?.onDelete === "function") {
        useData.onDelete({ id: data?.id }, () => {
          dispatch("reload", { name: langBase });
          handleClose();
        });
      }
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { backgroundColor: "warning.light" } }}
    >
      <DialogTitle>
        <Text
          name="delete"
          value={data?.caption}
          sx={{ color: "warning.contrastText" }}
          langBase="global.dialog.caption"
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Text
            name="deleteInfo"
            value={data?.caption2}
            sx={{ color: "warning.contrastText" }}
            langBase="global.dialog.caption"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleOnOk}
          name="delete"
          langBase="global.dialog.action"
          variant="default"
          sxText={{ color: "warning.contrastText" }}
        />
        <Button
          onClick={handleClose}
          autoFocus
          name="cancel"
          langBase="global.dialog.action"
        />
      </DialogActions>
    </Dialog>
  );
};

export { Delete as DialogDelete };
