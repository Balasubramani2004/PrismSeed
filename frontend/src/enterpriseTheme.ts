import { createTheme, alpha } from "@mui/material/styles";

export const enterpriseTheme = createTheme({
  shape: { borderRadius: 10 },
  palette: {
    mode: "light",
    primary: { main: "#0B57D0" },
    background: { default: "#F6F8FB", paper: "#FFFFFF" },
    text: { primary: "#0B1220", secondary: "#5B6472" },
    divider: alpha("#0B1220", 0.08),
  },
  typography: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    h4: { fontWeight: 900, letterSpacing: -0.6 },
    h6: { fontWeight: 800 },
    button: { textTransform: "none", fontWeight: 800 },
  },
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1px solid ${alpha("#0B1220", 0.08)}`,
          boxShadow: "0 6px 18px rgba(16,24,40,0.06)",
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1px solid ${alpha("#0B1220", 0.06)}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
        },
        contained: {
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#0B1220",
          color: "rgba(255,255,255,0.88)",
          borderRight: `1px solid ${alpha("#FFFFFF", 0.10)}`,
        },
      },
    },
  },
});