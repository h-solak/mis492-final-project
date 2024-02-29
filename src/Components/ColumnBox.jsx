import React from "react";
import { Box } from "@mui/material";

const ColumnBox = ({ children, ...props }) => {
  return (
    <Box display={"flex"} flexDirection={"column"} {...props}>
      {children}
    </Box>
  );
};

export default ColumnBox;
