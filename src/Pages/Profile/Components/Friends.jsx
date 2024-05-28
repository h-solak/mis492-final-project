import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../../Services/Users";
import useUser from "../../../Contexts/User/useUser";
import Avatar from "../../../Components/Avatar";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../../Components/Modals/Modal";
import AddFriendsButton from "./AddFriendsButton";

const Friends = ({ userProfile }) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [friendsModal, setFriendsModal] = useState(false);
  const { user } = useUser();
  const handleGetFriends = async () => {
    const userFriends = userProfile?.friends?.map((friend) => friend?.id);

    if (!userFriends?.length > 0) return;

    const usersData = await getUsers(userFriends);
    setFriends(usersData);
  };
  useEffect(() => {
    handleGetFriends();
  }, []);
  return (
    !!(userProfile?.friends?.length > 0) && (
      <Grid container spacing={1} mt={2}>
        <Grid item xs={12}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>
              Friends ({userProfile?.friends?.length || "0"})
            </Typography>
            {!!(userProfile?.friends?.length > 8) && (
              <Button
                size="small"
                sx={{
                  textTransform: "capitalize",
                }}
                onClick={() => setFriendsModal(true)}
              >
                See All
              </Button>
            )}
          </Box>
        </Grid>
        {friends?.slice(0, 8).map((friend) => {
          const { _id, username } = friend;
          const isMatched =
            userProfile?.friends?.find((userItem) => userItem?.id == _id)
              ?.type == "match";
          if (
            !(user?._id == userProfile?._id) &&
            !userProfile?.privacy?.matchedFriendsVisible &&
            isMatched
          ) {
            return null;
          } else if (
            !(user?._id == userProfile?._id) &&
            isMatched &&
            !userProfile?.privacy?.profileVisible
          ) {
            //WHEN profile is private, HIDE matched friends but show default friends
            return null;
          }

          return (
            <Grid item key={_id}>
              <Link to={`/profile/${username}`}>
                <Tooltip
                  title={
                    user?._id == _id
                      ? "You"
                      : user?.friends?.find((userItem) => userItem?.id == _id)
                          ?.type == "match"
                      ? `${username} (Match)`
                      : username
                  }
                >
                  {" "}
                  <Avatar
                    name={username}
                    size={40}
                    style={{
                      boxShadow:
                        user?._id == _id
                          ? "rgba(0, 0, 0, 0.16) 0px 1px4px, rgba(255, 0, 0, 0.8) 0px 0px 0px 3px"
                          : 0,
                    }}
                    isMatched={isMatched}
                  />{" "}
                </Tooltip>
              </Link>
            </Grid>
          );
        })}
        <Modal isModalOpen={friendsModal} setIsModalOpen={setFriendsModal}>
          <Grid
            container
            spacing={3}
            sx={{
              overflowY: "scroll",
              height: "50vh",
            }}
          >
            <Grid item xs={12}>
              <Typography>
                Friends of{" "}
                <Typography component="span" fontWeight={"bold"}>
                  {userProfile?.username}
                </Typography>
              </Typography>
            </Grid>
            {friends?.map((friend) => {
              const { _id, username } = friend;
              const isMatched =
                userProfile?.friends?.find((userItem) => userItem?.id == _id)
                  ?.type == "match";

              if (
                !(user?._id == userProfile?._id) &&
                !userProfile?.privacy?.matchedFriendsVisible &&
                isMatched
                //  && !userProfile?.privacy?.profileVisible
              ) {
                //if user chose not to display matched friends
                return null;
              } else if (
                !(user?._id == userProfile?._id) &&
                isMatched &&
                !userProfile?.privacy?.profileVisible
              ) {
                //WHEN profile is private, HIDE matched friends but show default friends
                return null;
              }

              return (
                <Grid item xs={12} key={_id}>
                  <Link to={`/profile/${username}`}>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <Avatar
                        name={username}
                        size={40}
                        style={{
                          boxShadow:
                            user?._id == _id
                              ? "rgba(0, 0, 0, 0.16) 0px 1px4px, rgba(255, 0, 0, 0.8) 0px 0px 0px 3px"
                              : 0,
                        }}
                        isMatched={isMatched}
                      />{" "}
                      <Typography>{username}</Typography>
                    </Box>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Modal>
      </Grid>
    )
  );
};

export default Friends;
