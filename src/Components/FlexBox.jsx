import React from "react";
import { Box } from "@mui/material";

const FlexBox = ({ children, ...props }) => {
  return (
    <Box display={"flex"} alignItems={"center"} {...props}>
      {children}
    </Box>
  );
};

export default FlexBox;
