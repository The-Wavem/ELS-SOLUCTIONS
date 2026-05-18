// src/theme/index.js
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D4AF37", // Dourado principal da ELC
      light: "#E6C875",
      dark: "#B8860B",
      contrastText: "#050505",
    },
    background: {
      default: "#050505", // Fundo principal super escuro
      paper: "#0A0A0A", // Fundo de cards, modais e painéis
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#A0AAB4",
    },
    divider: "rgba(212, 175, 55, 0.1)",
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Cormorant Garamond", serif',
      fontStyle: "italic",
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 500,
    },
    h3: {
      fontFamily: '"Cormorant Garamond", serif',
    },
    // Estilo especial para marcações e subtítulos
    overline: {
      letterSpacing: "0.2em",
      fontWeight: 700,
      color: "#D4AF37",
    },
  },
  components: {
    // Customizações globais de componentes do MUI
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", 
        },
      },
    },
  },
});
