import { misBaseAxios } from "../api/config";

const getUserProfile = async (username) => {
  try {
    const res = await misBaseAxios.get(`/user/${username}`);
    return res?.data?.user;
  } catch (error) {
    console.error(error);
  }
};

export { getUserProfile };
