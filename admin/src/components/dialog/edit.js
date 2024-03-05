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
    loading: loadingProps,
    actionLangBase,
  } = props;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);

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
      if (typeof useData?.onGet === "function") {
        useData.onGet({ id }, (data) => {
          setData(data);
        });
      }
    }
  }, [needLoading, id, useData]);

  const handleOk = useCallback(() => {
    if (data?.id) {
      if (typeof useData?.onEdit === "function") {
        useData.onEdit(data, () => {
          dispatch("reload", { name: langBase });
          setOpen(false);
        });
      }
      return;
    }
    if (typeof useData?.onPost === "function") {
      useData.onPost(data, () => {
        dispatch("reload", { name: langBase });
        setOpen(false);
      });
    }
  }, [useData, data, langBase]);

  const handleClose = () => {
    setOpen(false);
  };

  const calcContainer =
    typeof container === "function" ? (
      container(data, setData)
    ) : (
      <container.type
        {...container.props}
        data={data}
        setData={setData}
        langBase={`${langBase}.dialog.edit`}
      />
    );

  const calcLoading = loadingProps;

  return (
    <Dialog fullScreen={fullScreen} open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ py: 1, ...sxHeader }}>
        {calcLoading
          ? "loading"
          : data?.id
          ? `Редактирование: ${data?.caption ?? data?.title}`
          : `Создать элемент`}
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
        {calcLoading ? (
          <Box defFlex center grow>
            LOADING
          </Box>
        ) : calcContainer ? (
          calcContainer
        ) : (
          <DialogContentText>{data?.caption2}</DialogContentText>
        )}
      </DialogContent>
      <Box grow />
      <Divider />
      <DialogActions>
        <Button
          onClick={handleOk}
          variant="default"
          disabled={calcLoading}
          langBase={`${actionLangBase ?? "global"}.dialog.action`}
          name={data?.id ? "save" : "create"}
        />
        <Button
          onClick={handleClose}
          autoFocus
          variant="outlined"
          sx={{ color: "warning.main" }}
          disabled={calcLoading}
          langBase={`${actionLangBase ?? "global"}.dialog.action`}
          name="cancel"
        />
      </DialogActions>
    </Dialog>
  );
};

export { Edit as DialogEdit };
