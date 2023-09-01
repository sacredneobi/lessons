import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Text, Button, ButtonDelete } from "@components";
import "./index.css";
import { Box } from "./components";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Box defFlex gap>
      <Button caption="test" />
      <Text caption="1" />
      <Text caption="22" />
      <Button caption={<Text caption="TEST FROM CAPTION" />} />
      <ButtonDelete />
      <ButtonDelete caption="Пока Пока" />
    </Box>
  </StrictMode>
);
