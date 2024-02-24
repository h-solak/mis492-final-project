import React, { useContext } from "react";
import ColorThemeContext from "./ColorThemeContext";

const useColorTheme = () => useContext(ColorThemeContext);

export default useColorTheme;
