import { addEvent } from "@utils";
import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { Box } from "../box";
import { Icon } from "../icon";
import { IconButton } from "../iconButton";

const Default = (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleOnClose = useCallback(
    (id) => {
      return (
        <IconButton
          name="closeAlert"
          onClick={() => {
            closeSnackbar(id);
          }}
        />
      );
    },
    [closeSnackbar]
  );

  useEffect(
    () =>
      addEvent("notification", (detail) => {
        enqueueSnackbar(
          <Box defFlex row ai gap>
            <Icon
              name={
                (detail.variant ?? "success") === "success" ? "done" : "error"
              }
            />
            {detail.caption ?? ""}
          </Box>,
          {
            variant: detail.variant ?? "success",
            style: {
              whiteSpace: "pre-line",
              paddingLeft: 12,
            },
            action: handleOnClose,
          }
        );
      }),
    [enqueueSnackbar, handleOnClose]
  );

  return <></>;
};

export { Default as Notification };
