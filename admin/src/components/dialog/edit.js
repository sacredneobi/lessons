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
import { useCallback, useEffect, useState } from "react";
import { Button } from "../button";
import { Divider } from "../divider";
import { Box } from "../box";

const Edit = (props) => {
  const {
    langBase,
    container,
    sxDialogContent,
    sxHeader,
    useData,
    needLoading,
  } = props;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(needLoading ?? false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!open) {
      setId(null);
    }
  }, [open]);

  useEffect(
    () =>
      addEvent(`${langBase}.dialog.edit`, (detail) => {
        setId(detail?.id);
        setData(detail);
        setOpen(true);
      }),
    [langBase]
  );

  useEffect(() => {
    if (needLoading && id) {
      if (typeof useData.onGet === "function") {
        setLoading(true);
        useData.onGet({ id }, (data) => {
          setData(data);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  }, [needLoading, id, useData]);

  const handleOk = useCallback(() => {
    if (data?.id) {
      if (typeof useData?.onEdit === "function") {
        useData.onEdit(data, () => {
          setOpen(false);
        });
      }
      return;
    }
    if (typeof useData?.onPost === "function") {
      useData.onPost(data, () => {
        setOpen(false);
      });
    }
  }, [useData, data]);

  const handleClose = () => {
    setOpen(false);
  };

  const calcContainer =
    typeof container === "function" ? (
      container(data)
    ) : (
      <container.type {...container.props} data={data} />
    );

  return (
    <Dialog fullScreen={fullScreen} open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ py: 1, ...sxHeader }}>
        {loading
          ? "loading"
          : `Редактирование: ${data?.caption ?? data?.title}`}
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
        {loading ? (
          <Box defFlex center grow>
            LOADING{" "}
          </Box>
        ) : calcContainer ? (
          calcContainer
        ) : (
          <DialogContentText>{data?.caption2}</DialogContentText>
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          onClick={handleOk}
          caption="Сохранить"
          variant="default"
          disabled={useData?.loading || loading}
        />
        <Button
          onClick={handleClose}
          autoFocus
          caption="Отмена"
          variant="outlined"
          sx={{ color: "warning.main" }}
          disabled={useData?.loading || loading}
        />
      </DialogActions>
    </Dialog>
  );
};

export { Edit as DialogEdit };
