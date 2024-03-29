import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Box, Grid, Typography } from "@mui/material";
import useUser from "../../Contexts/User/useUser";
import CenteredBox from "../../Components/CenteredBox";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../Services/User";
import AvatarImg from "../../Components/AvatarImg";
import RateItem from "./Components/RateItem";

const Profile = () => {
  const { user } = useUser();
  const [pageLoading, setPageLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    id: "",
    username: "",
    rates: [],
  });
  const { username } = useParams();

  /*
      Get user profile using params
    */

  useEffect(() => {
    //Call this function everytime username param changes
    handleGetUserProfile();
  }, [username]);

  const handleGetUserProfile = async () => {
    setPageLoading(true);
    const crrUser = await getUserProfile(username);
    setUserProfile(crrUser);
    setPageLoading(false);
  };

  const isOwnProfile = user?._id == userProfile?._id;

  return (
    <Layout pageLoading={pageLoading}>
      <Grid item xs={12}>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <AvatarImg no={userProfile?.crrAvatar} width={90} height={90} />
          <Box>
            <Typography fontWeight={600}>{userProfile?.username}</Typography>
            <Typography color={"secondary"}>{userProfile?.desc}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} marginTop={4}>
        <Typography color={"secondary"} py={2}>
          All of{" "}
          <Typography
            variant="span"
            sx={{
              textTransform: "capitalize",
            }}
          >
            {userProfile?.username}
          </Typography>
          's Reviews/Rates ({userProfile?.rates.length})
        </Typography>
        {userProfile?.rates?.map((rate) => (
          <RateItem rate={rate} />
        ))}
      </Grid>
    </Layout>
  );
};

export default Profile;
