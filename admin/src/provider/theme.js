import { useEffect, useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { addEvent } from "@utils";

const arrTheme = ["dark", "light"];

const Default = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const readMode = localStorage.getItem("theme");
  const [mode, setMode] = useState(
    arrTheme.includes(readMode) ? readMode : "system"
  );

  useEffect(
    () =>
      addEvent("theme", (value) => {
        setMode(value);
      }),
    []
  );

  const theme = useMemo(() => {
    const calcMode =
      mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode;

    const defTheme = createTheme({
      palette: {
        mode: calcMode,
      },
    });

    return createTheme({
      palette: {
        mode: calcMode,
        background: {
          sectionBackground:
            calcMode === "dark"
              ? "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))"
              : "#fff",
          strong:
            calcMode === "dark"
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(0, 0, 0, 0.26)",
          grad: (type) =>
            `linear-gradient(110deg, ${
              Array.isArray(type) ? type[0] : defTheme.palette[type]?.dark
            } 0%, ${
              Array.isArray(type) ? type[1] : defTheme.palette[type]?.light
            } 100%)`,
        },
      },
      typography: {
        fontFamily: "'Nunito', sans-serif",
      },
    });
  }, [prefersDarkMode, mode]);

  return <ThemeProvider theme={theme} {...props} />;
};

export { Default as Theme };
