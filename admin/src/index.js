import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { Dashboard } from "./dashboard";
import { FetchProvider, Theme } from "./provider";
import { RootSettingContext } from "./context";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Theme>
      <CssBaseline />
      <RootSettingContext>
        <FetchProvider>
          <Dashboard />
        </FetchProvider>
      </RootSettingContext>
    </Theme>
  </StrictMode>
);
