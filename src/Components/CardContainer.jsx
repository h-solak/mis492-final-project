import { Box } from "@mui/material";
import React from "react";

const CardContainer = ({
  children,
  className,
  padding,

  alignItems,
  justifyContent,
  gap,
  sx,
}) => {
  const defaultSx = {
    justifyContent: justifyContent || "center",
    alignItems: alignItems || "start",
  };
  return (
    <Box
      className={className || ""}
      display={"flex"}
      flexDirection={"column"}
      gap={gap >= 0 ? gap : 1}
      padding={padding >= 0 ? padding : 0}
      sx={{ ...defaultSx, ...sx }}
    >
      {children}
    </Box>
  );
};

export default CardContainer;
