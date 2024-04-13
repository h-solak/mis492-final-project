import { Box, Grid } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navigation/Navbar";
import Sidebar from "../Components/Navigation/Sidebar";
import useUser from "../Contexts/User/useUser";
import CenteredBox from "../Components/CenteredBox";
import Lottie from "lottie-react";
import PopcornLoader from "../assets/animations/popcorn.json";

const Layout = ({
  children,
  disablePaddingX = false,
  disablePaddingY = false,
  pageLoading = false,
  ...props
}) => {
  const { user } = useUser();
  return (
    <Box minHeight={"100vh"}>
      {/* Navbar is visible only for mobile devices */}
      <Navbar />
      <Grid container>
        {user?._id ? <Sidebar /> : null}
        {/* Page Contents */}
        <Grid item xs={12} sm={user?._id ? 9 : 12}>
          <Grid
            container
            px={disablePaddingX ? 0 : 4}
            py={disablePaddingY ? 0 : 4}
            {...props}
          >
            {pageLoading ? (
              <CenteredBox>
                <Lottie
                  animationData={PopcornLoader}
                  loop={true}
                  style={{
                    width: 150,
                  }}
                />
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
