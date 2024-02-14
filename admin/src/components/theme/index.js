import { useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Default = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  console.log(prefersDarkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          background: {
            sectionBackground: prefersDarkMode
              ? "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))"
              : "#fff",
            strong: prefersDarkMode
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(0, 0, 0, 0.26)",
          },
        },
        typography: {
          fontFamily: "'Nunito', sans-serif",
        },
      }),
    [prefersDarkMode]
  );

  return <ThemeProvider theme={theme} {...props} />;
};

export { Default as Theme };
