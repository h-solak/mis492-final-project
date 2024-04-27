import { misBaseAxios } from "../api/config";

const getUsersWithUsernameSearch = async (username) => {
  try {
    const res = await misBaseAxios.get(`/users/${username}`);
    return res?.data?.users;
  } catch (error) {
    console.log(error);
  }
};

//get users using array of ids
const getUsers = async (arrayOfIds) => {
  try {
    const res = await misBaseAxios.get(
      `/users?user_ids=${arrayOfIds.join(",")}`
    );
    return res?.data?.users;
  } catch (error) {
    console.log(error);
  }
};

export { getUsersWithUsernameSearch, getUsers };
