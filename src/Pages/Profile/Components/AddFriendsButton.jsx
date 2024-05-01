import React, { useState } from "react";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import {
  Close,
  Done,
  HourglassFull,
  Person,
  PersonAdd,
  PersonRemove,
} from "@mui/icons-material";
import {
  cancelFriendRequest,
  removeFriend,
  respondToFriendRequest,
  sendFriendRequest,
} from "../../../Services/Friends";
import useUser from "../../../Contexts/User/useUser";
import FlexBox from "../../../Components/FlexBox";
import ColumnBox from "../../../Components/ColumnBox";
import ConfirmationModal from "../../../Components/Modals/ConfirmationModal";

const AddFriendsButton = ({ user2id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [removeFriendModal, setRemoveFriendModal] = useState(false);
  const [cancelPendingRequestModal, setCancelPendingRequestModal] =
    useState(false);
  const { user, setUser } = useUser();
  const isFriend = user?.friends?.find((friend) => friend.id == user2id);
  const pendingRequest = user?.pendingFriendRequests?.find(
    (request) => request.sender == user2id || request.receiver == user2id
  ); //undefined if there is no such a request

  const handleSendFriendRequest = async () => {
    setIsLoading(true);
    const newPendingFriendRequests = (await sendFriendRequest(user2id)) || [];
    setUser((oldUser) => ({
      ...oldUser,
      pendingFriendRequests: newPendingFriendRequests,
    }));
    setIsLoading(false);
  };

  const handleRespondToFriendRequest = async (action) => {
    setIsLoading(true);
    const data = await respondToFriendRequest({
      receiver: pendingRequest.receiver,
      sender: pendingRequest.sender,
      action: action,
    });
    if (data?.pendingFriendRequests && data?.friends) {
      setUser((oldUser) => ({
        ...oldUser,
        pendingFriendRequests: data?.pendingFriendRequests,
        friends: data?.friends,
      }));
    }
    setIsLoading(false);
  };

  const handleCancelFriendRequest = async () => {
    setIsLoading(true);
    const newPendingFriendRequests =
      (await cancelFriendRequest({
        receiver: pendingRequest.receiver,
        sender: pendingRequest.sender,
      })) || [];
    setUser((oldUser) => ({
      ...oldUser,
      pendingFriendRequests: newPendingFriendRequests,
    }));
    setIsLoading(false);
  };

  const handleRemoveFriend = async () => {
    setIsLoading(true);
    const newFriends = (await removeFriend(user2id)) || [];
    setUser((oldUser) => ({
      ...oldUser,
      friends: newFriends,
    }));
    setIsLoading(false);
  };
  return isFriend ? (
    <>
      <Tooltip title="Remove from friends">
        <Button
          variant="contained"
          color="primary"
          startIcon={
            !isLoading ? <Person /> : <span className="loader-sm-dark" />
          }
          onClick={() => setRemoveFriendModal(true)}
          sx={{
            py: 1,
            borderRadius: 99,
          }}
          fullWidth
        >
          FRIENDS
        </Button>
      </Tooltip>
      <ConfirmationModal
        isModalOpen={removeFriendModal}
        setIsModalOpen={setRemoveFriendModal}
        action={handleRemoveFriend}
        warningText={`This user will be removed from your friends.`}
      />
    </>
  ) : pendingRequest ? (
    <>
      {pendingRequest?.receiver == user?._id ? (
        <ColumnBox>
          <Typography fontSize={12} textAlign={"center"} mb={1}>
            You have a friend request from this user
          </Typography>
          <FlexBox justifyContent="center" gap={2}>
            <Button
              size="small"
              color="success"
              onClick={() => handleRespondToFriendRequest("accept")}
              startIcon={
                <Done
                  sx={{
                    fontSize: 16,
                  }}
                />
              }
            >
              Accept
            </Button>
            <Button
              size="small"
              color="warning"
              onClick={() => handleRespondToFriendRequest("reject")}
              startIcon={
                <Close
                  sx={{
                    fontSize: 16,
                  }}
                />
              }
            >
              Reject
            </Button>
          </FlexBox>
        </ColumnBox>
      ) : (
        <>
          <Tooltip title={"Cancel request"}>
            <Button
              variant="outlined"
              color="dark"
              startIcon={
                !isLoading ? (
                  <HourglassFull />
                ) : (
                  <span className="loader-sm-dark" />
                )
              }
              onClick={() => setCancelPendingRequestModal(true)}
              sx={{
                py: 1,
                borderRadius: 99,
              }}
              fullWidth
            >
              Pending Request
            </Button>
          </Tooltip>
          <ConfirmationModal
            isModalOpen={cancelPendingRequestModal}
            setIsModalOpen={setCancelPendingRequestModal}
            action={handleCancelFriendRequest}
            warningText={`The request you've sent will be cancelled.`}
          />
        </>
      )}
    </>
  ) : (
    <Button
      variant="outlined"
      color="dark"
      startIcon={
        !isLoading ? <PersonAdd /> : <span className="loader-sm-dark" />
      }
      onClick={handleSendFriendRequest}
      sx={{
        py: 1,
        borderRadius: 99,
      }}
      fullWidth
    >
      Add to Friends
    </Button>
  );
};

export default AddFriendsButton;
