import { createTheme } from "@mui/material/styles";

/*
Theme:

https://colorhunt.co/palette/4a55a27895cba0bfe0c5dff8

*/
const theme = createTheme({
  palette: {
    primary: {
      main: "#C20114",
      light: "#e74c3c",
    },
    secondary: {
      //grey(ish)
      main: "#a6a6a6",
      light: "#ededed",
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
