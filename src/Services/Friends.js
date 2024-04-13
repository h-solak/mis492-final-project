import { misBaseAxios } from "../api/config";

const sendFriendRequest = async (userId) => {
  try {
    const res = await misBaseAxios.post(`/friends/${userId}`);
    return res?.data?.pendingFriendRequests;
  } catch (error) {
    console.log(error);
  }
};

export { sendFriendRequest };
