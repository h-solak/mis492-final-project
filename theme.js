import { createTheme } from "@mui/material/styles";

/*
Theme:

https://colorhunt.co/palette/4a55a27895cba0bfe0c5dff8

*/
const theme = createTheme({
  palette: {
    primary: {
      main: "#c0392b",
      light: "#e74c3c",
    },
    secondary: {
      //grey(ish)
      main: "#999999",
    },
    highlight: {
      //accent color - call to action (cta)
      main: "#2980b9",
    },
    error: {
      main: "#950101",
    },
    white: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

export default theme;
