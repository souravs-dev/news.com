import React, { useContext, useMemo } from "react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { NewsContext } from "../context/NewsContext";

const NewsTheme = ({ children }) => {
  const { themeMode } = useContext(NewsContext);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            light: "#40c4ff",
            main: "#212121",
            dark: "#01579b",
            contrastText: "#fff",
          },
          secondary: {
            light: "#81d4fa",
            main: "#08C2FF",
            dark: "#01579b",
            contrastText: "#000",
          },
        },
      }),
    [themeMode]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export { NewsTheme };
