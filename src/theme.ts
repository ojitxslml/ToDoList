import { PaletteMode, createTheme } from "@mui/material/styles";

const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: mode === "dark" ? "#f48fb1" : "#dc004e",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f4f6f8",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontSize: "2rem",
        fontWeight: 700,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px", // Botones redondeados
          },
          containedPrimary: {
            color: "#fff",
          },
        },
      },
    },
  });

export default createAppTheme;
