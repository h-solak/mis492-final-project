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
  console.log(user);
  return (
    <Box>
      <Navbar />
      {/* Layout default settings should be: paddingX={4}  */}
      {/* paddingTop should be 4 to avoid navbar getting in the way */}
      <Grid container>
        {user?._id ? <Sidebar /> : null}
        {/* Page Contents */}
        <Grid item xs={12} md={user?._id ? 9.6 : 12}>
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
