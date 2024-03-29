import { Box } from "@mui/material";
import React from "react";

const CenteredBox = ({ absolute = false, children, ...props }) => {
  return absolute ? (
    <Box className="absolute-center" {...props}>
      {" "}
      {children}
    </Box>
  ) : (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 120px)" //navbar is 56px, this is just hard coded bad stuff
      width="100%"
      {...props}
    >
      {children}
    </Box>
  );
};

export default CenteredBox;
