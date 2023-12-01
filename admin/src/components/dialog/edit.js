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
import { Divider } from "../divider";

const Edit = (props) => {
  const { langBase, container, sxDialogContent, sxHeader } = props;

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
    <Dialog fullScreen={fullScreen} open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ py: 1, ...sxHeader }}>
        Редактирование: {data?.caption}
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          py: 1,
          px: 0,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          ...sxDialogContent,
        }}
      >
        {container ? (
          container
        ) : (
          <DialogContentText>{data?.caption2}</DialogContentText>
        )}
      </DialogContent>
      <Divider />
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
