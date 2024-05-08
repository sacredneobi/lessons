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
import { LangContext, useLang } from "@context";
import { Text } from "../text";

const Edit = (props) => {
  const {
    langBase: langBaseProps,
    container,
    sxDialogContent,
    sxHeader,
    useData,
    needLoading,
    loading: loadingProps,
    actionLangBase,
  } = props;

  const lang = useLang();

  const langBase = lang?.lang ?? langBaseProps;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState({ isError: false });

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
      container(data, setData, error, setError)
    ) : (
      <container.type
        {...container.props}
        data={data}
        setData={setData}
        langBase={`${langBase}.dialog.edit`}
        error={error}
        setError={setError}
      />
    );

  const calcLoading = loadingProps;

  return (
    <Dialog fullScreen={fullScreen} open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ py: 1, ...sxHeader }}>
        {calcLoading ? (
          <Text name="loading" langBase="global.dialog.caption" />
        ) : data?.id ? (
          <Text
            name="edit"
            value={data?.caption ?? data?.title}
            langBase="global.dialog.caption"
          />
        ) : (
          <Text name="create" langBase="global.dialog.caption" />
        )}
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
        <LangContext lang={`${langBase}.dialog`}>
          {calcLoading ? (
            <Box defFlex center grow>
              <Text name="loading" langBase="global.dialog.caption" />
            </Box>
          ) : calcContainer ? (
            calcContainer
          ) : (
            <DialogContentText>{data?.caption2}</DialogContentText>
          )}
        </LangContext>
      </DialogContent>
      <Box grow />
      <Divider />
      <DialogActions>
        <Button
          onClick={handleOk}
          variant="default"
          disabled={calcLoading || error.isError}
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
