import { misBaseAxios } from "../api/config";

const getProfileUser = async (username) => {
  try {
    const res = await misBaseAxios.get(`/user/${username}`);
    return res?.data?.user;
  } catch (error) {
    console.log(error);
  }
};

const getProfileUserUsingId = async (id) => {
  try {
    const res = await misBaseAxios.get(`/user/withId/${id}`);
    return res?.data?.user;
  } catch (error) {
    console.log(error);
  }
};

export { getProfileUser, getProfileUserUsingId };
