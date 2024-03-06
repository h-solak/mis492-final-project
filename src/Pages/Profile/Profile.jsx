import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { Grid, Typography } from "@mui/material";
import useUser from "../../Contexts/User/useUser";
import CenteredBox from "../../Components/CenteredBox";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState({});
  const { username } = useParams();

  /*
      Get user profile using params
    */

  const handleGetUserProfile = async () => {};

  return (
    <Layout>
      <Grid item xs={12}>
        <CenteredBox textAlign={"center"} flexDirection="column">
          <Typography variant="h3">This is</Typography>
          <Typography fontWeight={600} fontSize={120}>
            {user?.username}
          </Typography>
        </CenteredBox>
      </Grid>
    </Layout>
  );
};

export default Profile;
