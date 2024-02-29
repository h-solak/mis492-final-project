import { Box, Grid } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar/Navbar";

const Layout = ({
  children,
  disablePaddingX = false,
  disablePaddingY = false,
  pageLoading = false,
  ...props
}) => {
  return (
    <Box>
      <Navbar />
      {/* Layout default settings should be: paddingX={4}  */}
      {/* paddingTop should be 4 to avoid navbar getting in the way */}
      <Grid
        container
        px={disablePaddingX ? 0 : 4}
        py={disablePaddingY ? 0 : 4}
        {...props}
      >
        {pageLoading ? (
          <span className="absolute-center loader"></span>
        ) : (
          children
        )}
      </Grid>
    </Box>
  );
};

export default Layout;
