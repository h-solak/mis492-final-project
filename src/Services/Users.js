import { misBaseAxios } from "../api/config";

const getUsers = async (username) => {
  try {
    const res = await misBaseAxios.get(`/users/${username}`);
    console.log(res);
    return res?.data?.users;
  } catch (error) {
    console.log(error);
  }
};

export { getUsers };
