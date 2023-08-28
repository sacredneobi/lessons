import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <div id="FIRST ELEMENT" />
    <input />
    <button>TEST</button>
  </StrictMode>
);
