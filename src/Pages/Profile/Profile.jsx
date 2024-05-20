import React, { createContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { getProfileUser } from "../../Services/User";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import RecentActivityPreview from "./Components/RecentActivityPreview";
import UserSidebar from "./Components/UserSidebar";
import ProfileNowWatching from "./Components/ProfileNowWatching";
import RecentCommentsPreview from "./Components/RecentCommentsPreview";
import UserLists from "./Components/UserLists";

export const ProfileUserContext = createContext();

const Profile = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [profileUser, setProfileUser] = useState({
    _id: "",
    username: "",
    rates: [],
  });
  const { username } = useParams();

  useEffect(() => {
    //Call this function everytime username param changes, empty brackets cause problems when user jumps on another user's profile
    handleGetProfileUser();
  }, [username]);

  const handleGetProfileUser = async () => {
    setPageLoading(true);
    const crrUser = await getProfileUser(username);
    setProfileUser(crrUser);
    setPageLoading(false);
  };

  return (
    <Layout pageLoading={pageLoading}>
      <ProfileUserContext.Provider
        value={{
          profileUser,
          setProfileUser,
        }}
      >
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
          {!!profileUser?.nowWatching?.id && (
            <Grid item xs={12} md={9} marginBottom={4}>
              <ProfileNowWatching />
            </Grid>
          )}
          <Grid item xs={12} md={9} marginBottom={4} px={4}>
            <RecentActivityPreview />
            <RecentCommentsPreview />
            <UserLists />
          </Grid>

          {/* Sidebar - User Info - md={3} */}
          <UserSidebar />
        </Grid>
      </ProfileUserContext.Provider>
    </Layout>
  );
};

export default Profile;
