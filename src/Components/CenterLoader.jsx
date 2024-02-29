import { Box } from "@mui/material";
import React from "react";

const CenterLoader = ({ absolute = false }) => {
  return absolute ? (
    <span className="absolute-center loader"></span>
  ) : (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <span className="loader"></span>
    </Box>
  );
};

export default CenterLoader;
