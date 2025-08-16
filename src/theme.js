import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    // pesos recomendados (usa los que necesites)
    h1: { fontWeight: 700, letterSpacing: ".02em" },
    h2: { fontWeight: 700, letterSpacing: ".02em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
  },
});

export default theme;