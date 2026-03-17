import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./styles.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif"
  },
  palette: {
    primary: {
      main: "#106a78"
    },
    secondary: {
      main: "#f47a20"
    },
    background: {
      default: "#f4f8fb"
    }
  },
  shape: {
    borderRadius: 14
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
