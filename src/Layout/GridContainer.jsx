import { Grid } from "@mui/material";
import React from "react";

const GridContainer = ({
  children,
  disablePaddingX = false,
  disablePaddingY = false,
  ...props
}) => {
  return (
    <Grid
      container
      px={disablePaddingX ? 0 : 4}
      py={disablePaddingY ? 0 : 4}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default GridContainer;
