import { createTheme } from "@mui/material/styles";

/*
Theme:

https://colorhunt.co/palette/4a55a27895cba0bfe0c5dff8

*/
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
      light: "#F94040",
    },
    secondary: {
      //grey(ish)
      main: "#989898",
      light: "#F9F9F9",
    },
    dark: {
      main: "#000",
    },
    highlight: {
      //accent color - call to action (cta)
      main: "#FFBC0B",
    },
    error: {
      main: "#950101",
    },
    white: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "Inter", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 600,
    fontWeightBolder: 700,
  },
});

export default theme;
