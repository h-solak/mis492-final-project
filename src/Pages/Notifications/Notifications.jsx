import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import useUser from "../../Contexts/User/useUser";
import { getUsers } from "../../Services/Users";
import AvatarImg from "../../Components/AvatarImg";
import FlexBox from "../../Components/FlexBox";
import { Close, Done } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ColumnBox from "../../Components/ColumnBox";
import { respondToFriendRequest } from "../../Services/Friends";

const Notifications = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState([]);
  const { user, setUser } = useUser();

  useEffect(() => {
    handleGetFriendRequests();
  }, [user]);

  const handleGetFriendRequests = async () => {
    setPageLoading(true);
    const arrayOfIds = user?.pendingFriendRequests
      ?.filter((request) => request?.receiver == user?._id)
      .map((request) => request?.sender);
    console.log(arrayOfIds);
    if (arrayOfIds?.length > 0) {
      const users = await getUsers(arrayOfIds);
      setFriendRequests(users);
    }
    setPageLoading(false);
  };

  const handleRespondToFriendRequest = async (action, otherUserId) => {
    const data = await respondToFriendRequest({
      receiver: user?._id,
      sender: otherUserId,
      action: action,
    });
    if (data?.pendingFriendRequests && data?.friends) {
      setUser((oldUser) => ({
        ...oldUser,
        pendingFriendRequests: data?.pendingFriendRequests,
        friends: data?.friends,
      }));
    }
  };

  return (
    <Layout>
      <Breadcrumbs
        links={[
          {
            title: `Notifications`,
            url: `/notifications`,
          },
        ]}
      />
      <Grid container>
        <Typography>
          Friend Requests{" "}
          {!!(friendRequests?.length > 0) && `(${friendRequests?.length})`}
        </Typography>

        {friendRequests?.length > 0 ? (
          friendRequests?.map((userItem) => (
            <Grid key={userItem?._id} item xs={12} mt={2}>
              <FlexBox gap={2}>
                <Tooltip title="Accept">
                  <IconButton
                    color="success"
                    onClick={() =>
                      handleRespondToFriendRequest("accept", userItem?._id)
                    }
                    sx={{
                      border: 2,
                    }}
                  >
                    <Done
                      sx={{
                        color: "primary",
                        fontSize: 16,
                      }}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Reject">
                  <IconButton
                    color="warning"
                    onClick={() =>
                      handleRespondToFriendRequest("reject", userItem?._id)
                    }
                    sx={{
                      border: 2,
                    }}
                  >
                    <Close
                      sx={{
                        color: "primary",
                        fontSize: 16,
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Link to={`/profile/${userItem?.username}`}>
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <AvatarImg no={userItem?.crrAvatar} width={56} />
                    <ColumnBox>
                      <Typography>{userItem?.username}</Typography>
                      <Typography fontSize={12} color={"secondary"}>
                        {userItem?.desc}
                      </Typography>
                    </ColumnBox>
                  </Box>
                </Link>
              </FlexBox>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} mt={2}>
            <Typography fontSize={14}>
              You haven't recieved any requests yet.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default Notifications;
