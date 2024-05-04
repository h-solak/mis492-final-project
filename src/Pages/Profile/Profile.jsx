import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../Services/User";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import RecentActivity from "./Components/RecentActivity";
import UserSidebar from "./Components/UserSidebar";

const Profile = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    _id: "",
    username: "",
    rates: [],
  });
  const { username } = useParams();

  useEffect(() => {
    //Call this function everytime username param changes, empty brackets cause problems when user jumps on another user's profile
    handleGetUserProfile();
  }, [username]);

  const handleGetUserProfile = async () => {
    setPageLoading(true);
    const crrUser = await getUserProfile(username);
    setUserProfile(crrUser);
    setPageLoading(false);
  };

  return (
    <Layout pageLoading={pageLoading}>
      <Breadcrumbs
        links={[
          {
            title: `${username}`,
            url: `/profile/${username}`,
          },
        ]}
      />
      <Grid container>
        {/* Recent Activities, Watchlists... */}
        <Grid item xs={12} md={9} marginBottom={4} px={4}>
          <RecentActivity />
        </Grid>
        {/* Sidebar - User Info - md={3} */}
        <UserSidebar userProfile={userProfile} />
      </Grid>
    </Layout>
  );
};

export default Profile;
