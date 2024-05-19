import React, { useContext } from "react";
import { getChatIdByUserId } from "../../../Services/Chat";
import useUser from "../../../Contexts/User/useUser";
import { Box, Button, Grid, Typography } from "@mui/material";
import ColumnBox from "../../../Components/ColumnBox";
import Avatar from "../../../Components/Avatar";
import { Chat } from "@mui/icons-material";
import AddFriendsButton from "./AddFriendsButton";
import Friends from "./Friends";
import { useNavigate } from "react-router-dom";
import { ProfileUserContext } from "../Profile";

const UserSidebar = () => {
  const { profileUser, setProfileUser } = useContext(ProfileUserContext);

  const navigate = useNavigate();
  const { user } = useUser();
  const isFriend = user?.friends?.find(
    (friend) => friend.id == profileUser?._id
  );
  const isOwnProfile = user?.username == profileUser?.username;

  const handleSendMessage = async () => {
    const chatId = await getChatIdByUserId(profileUser?._id);
    if (chatId) {
      navigate(`/chat?chatId=${chatId}`);
    } else {
      toast.error("Something went wrong!");
    }
  };
  return (
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
          <Avatar name={profileUser?.username} size={80} />
          <Typography fontWeight={"bold"}>{profileUser?.username}</Typography>
          <Typography color={"primary.light"} fontWeight={"bold"} fontSize={12}>
            {user?.personality?.type}
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
          <Typography fontSize={14}>"{profileUser?.desc}"</Typography>
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
              {profileUser?.rates?.length || 0}
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
              {profileUser?.rates?.filter((item) => item?.review).length || 0}
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
          <AddFriendsButton user2id={profileUser?._id} />
        </Box>
      )}

      {/* Friends List */}
      <Friends profileUser={profileUser} />
    </Grid>
  );
};

export default UserSidebar;
