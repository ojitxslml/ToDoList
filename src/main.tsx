import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store.tsx";
import createAppTheme from "./theme";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";

const getInitialColorMode = (): PaletteMode => {
  const savedMode = localStorage.getItem("color-mode");
  if (savedMode === "light" || savedMode === "dark") return savedMode;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const Root = () => {
  const [mode, setMode] = useState<PaletteMode>(getInitialColorMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";
      localStorage.setItem("color-mode", nextMode);
      return nextMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <App mode={mode} onToggleColorMode={toggleColorMode} />
      </Provider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
