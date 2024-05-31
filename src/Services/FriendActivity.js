import { misBaseAxios } from "../api/config";

const getFriendActivity = async () => {
  try {
    const res = await misBaseAxios.get(`/friend-activity`);
    return res?.data?.friendActivity;
  } catch (error) {
    console.log(error);
  }
};

export { getFriendActivity };
