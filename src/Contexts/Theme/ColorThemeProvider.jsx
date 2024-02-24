import ColorThemeContext from "./ColorThemeContext";
import React, { useState } from "react";

const ColorThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState("light");
  return (
    <ColorThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
};

export default ColorThemeProvider;
