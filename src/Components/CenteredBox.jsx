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
      height="100%" //NEEDS A FIX !!!
      width="100%"
      minHeight={"75vh"}
      {...props}
    >
      {children}
    </Box>
  );
};

export default CenteredBox;
