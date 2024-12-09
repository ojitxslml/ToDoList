import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Azul predeterminado
    },
    secondary: {
      main: "#dc004e", // Rojo predeterminado
    },
    background: {
      default: "#f4f6f8", // Color de fondo global
      paper: "#ffffff", // Fondo para componentes de papel
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

export default theme;
