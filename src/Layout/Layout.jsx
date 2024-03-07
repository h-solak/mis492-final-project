import { Box, Grid } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navigation/Navbar";
import Sidebar from "../Components/Navigation/Sidebar";
import useUser from "../Contexts/User/useUser";
import CenteredBox from "../Components/CenteredBox";

const Layout = ({
  children,
  disablePaddingX = false,
  disablePaddingY = false,
  pageLoading = false,
  ...props
}) => {
  const { user } = useUser();
  return (
    <Box minHeight={"100vh"} backgroundColor={"#f0f2f5"}>
      <Navbar />
      {/* paddingTop should be 4 to avoid navbar getting in the way */}
      <Grid container>
        {user?._id ? <Sidebar /> : null}
        {/* Page Contents */}
        <Grid
          item
          xs={12}
          sm={12}
          md={user?._id ? 9.6 : 12}
          sx={{
            backgroundColor: "#F0F2F5",
          }}
        >
          <Grid
            container
            px={disablePaddingX ? 0 : 4}
            py={disablePaddingY ? 0 : 4}
            {...props}
          >
            {pageLoading ? (
              <CenteredBox>
                <span className="loader"></span>
              </CenteredBox>
            ) : (
              children
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
