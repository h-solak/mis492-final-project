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
      main: "#a6a6a6",
      light: "#ededed",
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
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

export default theme;
