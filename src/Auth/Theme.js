// import { createTheme } from "@material-ui/core";
import createTheme from "@mui/material/styles/createTheme";

export let theme = createTheme({
  palette: {
    primary: {
      main: "#3c8dbc",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 992,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),

    h5: {
      fontFamily: ["Poppins", "sans-serif"],
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: "1.334",
      letterSpacing: "0em",
    },
    h4: {
      fontFamily: ["Poppins", "sans-serif"],
    },
    h2: {
      fontFamily: ["Poppins", "sans-serif"],
    },
  },
});
