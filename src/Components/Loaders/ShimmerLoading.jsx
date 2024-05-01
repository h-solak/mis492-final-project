import { Box } from "@mui/material";
import React from "react";

const ShimmerLoading = ({ width, height, ...props }) => {
  return (
    <Box
      width={width}
      height={height}
      className="shimmer"
      borderRadius={4}
      {...props}
    />
  );
};

export default ShimmerLoading;
