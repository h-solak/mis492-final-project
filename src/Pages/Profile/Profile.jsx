import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Box, Button, Grid, Typography } from "@mui/material";
import useUser from "../../Contexts/User/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../../Services/User";
import RateItem from "./Components/RateItem";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import ColumnBox from "../../Components/ColumnBox";
import AddFriendsButton from "./Components/AddFriendsButton";
import Avatar from "../../Components/Avatar";
import { Chat } from "@mui/icons-material";
import { getChatIdByUserId } from "../../Services/Chat";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUser();
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

  const isFriend = user?.friends?.find(
    (friend) => friend.id == userProfile?._id
  );
  const isOwnProfile = user?.username == userProfile?.username;

  console.log(userProfile);

  const handleSendMessage = async () => {
    const chatId = await getChatIdByUserId(userProfile?._id);
    if (chatId) {
      navigate(`/chat?chatId=${chatId}`);
    } else {
      toast.error("Something went wrong!");
    }
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
        <Grid item xs={12} md={9} px={4}>
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
            <RateItem key={rate?.movieTitle} rate={rate} />
          ))}
        </Grid>
        {/* Sidebar - User Info */}
        <Grid
          item
          xs={12}
          md={3}
          justifyContent={"center"}
          sx={{
            position: "sticky",
            top: 50,
            maxHeight: "50vh",
          }}
        >
          <ColumnBox
            py={4}
            sx={{
              backgroundColor: "secondary.light",
              borderRadius: 4,
            }}
          >
            <ColumnBox alignItems="center" alignSelf="center">
              <Avatar name={userProfile?.username} size={80} />
              <Typography fontWeight={"bold"}>
                {userProfile?.username}
              </Typography>
              <Typography
                color={"primary.light"}
                fontWeight={"bold"}
                fontSize={12}
              >
                Drama Queen
              </Typography>
            </ColumnBox>

            <Box
              textAlign={"center"}
              marginTop={2}
              p={2}
              mx={2}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 4,
              }}
            >
              <Typography fontSize={14}>"{userProfile?.desc}"</Typography>
            </Box>

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              px={4}
              marginTop={4}
            >
              <Typography textAlign={"center"}>
                <Typography fontSize={20}>
                  {userProfile?.rates?.length || 0}
                </Typography>
                <Typography fontSize={12}>Movies</Typography>
              </Typography>
              <Box
                sx={{
                  minHeight: 44,
                  height: "100% !important",
                  width: "1px",
                  backgroundColor: "#CBCBCB",
                }}
              />
              <Typography textAlign={"center"}>
                <Typography fontSize={20}>
                  {userProfile?.rates?.filter((item) => item?.review).length ||
                    0}
                </Typography>
                <Typography fontSize={12}>Reviews</Typography>
              </Typography>
            </Box>
          </ColumnBox>
          {/* <Button
            color="dark"
            onClick={() => null}
            variant="outlined"
            sx={{
              borderRadius: 99,
              py: 1,
              marginTop: 2,
            }}
            startIcon={<PersonAdd />}
            fullWidth
          >
            Add To Friends
          </Button> */}
          {!!(!isOwnProfile && isFriend) && (
            <Box mt={4}>
              <Button
                variant="outlined"
                startIcon={<Chat />}
                onClick={handleSendMessage}
                fullWidth
              >
                Send a message
              </Button>
            </Box>
          )}
          {!isOwnProfile && (
            <Box mt={2}>
              <AddFriendsButton user2id={userProfile?._id} />
            </Box>
          )}

          <Box marginTop={4}>Friends ({user?.friends?.length || "0"})</Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Profile;
