import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { addEvent } from "@utils";
import { useEffect, useState } from "react";
import { Button } from "../button";

const Edit = (props) => {
  const { langBase, container } = props;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(
    () =>
      addEvent(`${langBase}.dialog.edit`, (detail) => {
        setData(detail);
        setOpen(true);
      }),
    [langBase]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      <DialogTitle>Редактирование: {data?.caption}</DialogTitle>
      <DialogContent>
        {container ? (
          container
        ) : (
          <DialogContentText>{data?.caption2}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} caption="Сохранить" variant="default" />
        <Button
          onClick={handleClose}
          autoFocus
          caption="Отмена"
          variant="outlined"
          sx={{ color: "warning.main" }}
        />
      </DialogActions>
    </Dialog>
  );
};

export { Edit as DialogEdit };
