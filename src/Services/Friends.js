import { misBaseAxios } from "../api/config";

const removeFriend = async (userId) => {
  try {
    const res = await misBaseAxios.delete(`/friends`, {
      data: {
        userId: userId,
      },
    });
    return res?.data?.friends;
  } catch (error) {
    console.log(error);
  }
};

const sendFriendRequest = async (userId) => {
  try {
    const res = await misBaseAxios.post(`/friends/request`, {
      userId: userId,
    });
    return res?.data?.pendingFriendRequests;
  } catch (error) {
    console.log(error);
  }
};

const respondToFriendRequest = async ({ sender, receiver, action }) => {
  try {
    const res = await misBaseAxios.put(`/friends/request`, {
      sender: sender,
      receiver: receiver,
      action: action /* accept/reject */,
    });
    /* RESPONSE: { pendingFriendRequests, friends } */
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

const cancelFriendRequest = async ({ sender, receiver }) => {
  try {
    const res = await misBaseAxios.delete(`/friends/request`, {
      data: {
        sender: sender,
        receiver: receiver,
      },
    });
    return res?.data?.pendingFriendRequests;
  } catch (error) {
    console.log(error);
  }
};

export {
  removeFriend,
  sendFriendRequest,
  respondToFriendRequest,
  cancelFriendRequest,
};
