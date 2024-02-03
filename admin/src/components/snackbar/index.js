import { Grow } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Notification } from "./notification";

const Default = (props) => {
  return (
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      TransitionComponent={Grow}
    >
      {props.children}
      <Notification />
    </SnackbarProvider>
  );
};

export { Default as Snackbar };
