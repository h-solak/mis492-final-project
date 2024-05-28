import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import AvatarImg from "../../../../Components/AvatarImg";
import ColumnBox from "../../../../Components/ColumnBox";
import {
  Close,
  Done,
  HourglassFull,
  PersonAdd,
  PersonRemove,
} from "@mui/icons-material";
import useUser from "../../../../Contexts/User/useUser";
import {
  cancelFriendRequest,
  removeFriend,
  respondToFriendRequest,
  sendFriendRequest,
} from "../../../../Services/Friends";
import FlexBox from "../../../../Components/FlexBox";
import { Link } from "react-router-dom";
import Avatar from "../../../../Components/Avatar";

const UserItem = ({ userData }) => {
  const { user, setUser } = useUser();
  const { _id, username, crrAvatar, friends, desc } = userData;
  const isFriend = user?.friends?.find((friend) => friend.id == _id);
  const isMatch =
    user?.friends?.find((friend) => friend?.id == _id)?.type == "match";
  const pendingRequest = user?.pendingFriendRequests?.find(
    (request) => request.sender == _id || request.receiver == _id
  ); //undefined if there is no such a request

  const handleSendFriendRequest = async () => {
    const newPendingFriendRequests = (await sendFriendRequest(_id)) || [];
    setUser((oldUser) => ({
      ...oldUser,
      pendingFriendRequests: newPendingFriendRequests,
    }));
  };

  const handleRespondToFriendRequest = async (action) => {
    const data = await respondToFriendRequest({
      receiver: pendingRequest.receiver,
      sender: pendingRequest.sender,
      action: action,
    });
    setUser((oldUser) => ({
      ...oldUser,
      pendingFriendRequests: data?.pendingFriendRequests,
      friends: data?.friends,
    }));
  };

  const handleCancelFriendRequest = async () => {
    const newPendingFriendRequests =
      (await cancelFriendRequest({
        receiver: pendingRequest.receiver,
        sender: pendingRequest.sender,
      })) || [];
    setUser((oldUser) => ({
      ...oldUser,
      pendingFriendRequests: newPendingFriendRequests,
    }));
  };

  const handleRemoveFriend = async () => {
    const newFriends = (await removeFriend(_id)) || [];
    setUser((oldUser) => ({
      ...oldUser,
      friends: newFriends,
    }));
  };
  return (
    user?._id != _id && (
      <Grid item xs={12} display={"flex"} alignItems={"center"} gap={1}>
        {isFriend ? (
          <Button
            size="small"
            variant="outlined"
            color="dark"
            startIcon={<PersonRemove />}
            onClick={handleRemoveFriend}
          >
            Remove
          </Button>
        ) : pendingRequest ? (
          <>
            {pendingRequest?.receiver == user?._id ? (
              <FlexBox gap={2}>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  startIcon={<Done />}
                  onClick={() => handleRespondToFriendRequest("accept")}
                >
                  Accept
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  startIcon={<Close />}
                  onClick={() => handleRespondToFriendRequest("reject")}
                >
                  Reject
                </Button>
              </FlexBox>
            ) : (
              <Tooltip title={"Cancel request"}>
                <Button
                  size="small"
                  variant="outlined"
                  color="dark"
                  startIcon={<HourglassFull />}
                  onClick={handleCancelFriendRequest}
                >
                  Pending
                </Button>
              </Tooltip>
            )}
          </>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="dark"
            startIcon={<PersonAdd />}
            onClick={handleSendFriendRequest}
          >
            Friend
          </Button>
        )}
        <Link to={`/profile/${username}`}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Avatar name={username} size={48} isMatched={isMatch} />
            <ColumnBox>
              <Typography>@{username}</Typography>
              <Typography color={"secondary"} fontSize={14}>
                {desc}
              </Typography>
            </ColumnBox>
          </Box>
        </Link>
      </Grid>
    )
  );
};

export default UserItem;
