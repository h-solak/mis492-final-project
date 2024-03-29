import { misBaseAxios } from "../api/config";

const getUserProfile = async (username) => {
  try {
    const res = await misBaseAxios.get(`/user/${username}`);
    console.log(res);
    return res?.data?.user;
  } catch (error) {
    console.log(error);
  }
};

export { getUserProfile };
