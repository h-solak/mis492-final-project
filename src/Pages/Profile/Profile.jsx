import React, { createContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getProfileUser } from "../../Services/User";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import RecentActivityPreview from "./Components/RecentActivityPreview";
import UserSidebar from "./Components/UserSidebar";
import ProfileNowWatching from "./Components/ProfileNowWatching";
import RecentCommentsPreview from "./Components/RecentCommentsPreview";
import UserLists from "./Components/UserLists";
import useUser from "../../Contexts/User/useUser";
import ColumnBox from "../../Components/ColumnBox";
import LockedSvg from "../../assets/illustrations/locked.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ProfileUserContext = createContext();

const Profile = () => {
  const { user } = useUser();
  const [pageLoading, setPageLoading] = useState(true);
  const [profileUser, setProfileUser] = useState({
    _id: "",
    username: "",
    rates: [],
  });
  const { username } = useParams();
  const isFriend = user?.friends?.find(
    (friend) => friend.id == profileUser?._id
  );

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
            {!(user?._id == profileUser?._id) &&
            !user?.friends?.find((friend) => friend.id == profileUser?._id) &&
            !profileUser?.privacy?.profileVisible ? (
              <Box height={"100%"}>
                <ColumnBox
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <LazyLoadImage
                    src={LockedSvg}
                    width={"100px"}
                    height={"120px"}
                  />
                  <Typography textAlign={"center"} fontWeight={700}>
                    This account is private
                  </Typography>
                  <Typography mt={2} color={"secondary"} textAlign={"center"}>
                    Be friends to access their rates, reviews, <br />
                    and all other activities!
                  </Typography>
                </ColumnBox>
              </Box>
            ) : (
              <>
                <RecentActivityPreview />
                <RecentCommentsPreview />
                <UserLists />
              </>
            )}
          </Grid>

          {/* Sidebar - User Info - md={3} */}
          <UserSidebar />
        </Grid>
      </ProfileUserContext.Provider>
    </Layout>
  );
};

export default Profile;
