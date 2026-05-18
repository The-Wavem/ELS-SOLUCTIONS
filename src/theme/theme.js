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
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#B8860B #050505',
          scrollBehavior: 'smooth',
        },
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#B8860B #050505',
          backgroundColor: '#050505',
          color: '#F5F5F5',
        },
        '#root': {
          minHeight: '100vh',
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#B8860B #050505',
        },
        '*::-webkit-scrollbar': {
          width: '6px', // Barra mais fina e elegante
          height: '6px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: '#050505', // Fundo escuro do site
          borderLeft: '1px solid rgba(212, 175, 55, 0.05)',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#2A2A2A',
          borderRadius: '10px',
          backgroundImage: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 100%)', // Degradê sutil
          transition: 'background-color 0.3s ease',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundImage: 'linear-gradient(180deg, #D4AF37 0%, #B8860B 100%)', // Degradê dourado no hover
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
