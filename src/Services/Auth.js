import axios from "axios";
import toast from "react-hot-toast";
import { misBaseAxios, removeAccessToken, setAccessToken } from "../api/config";

const loginUser = async ({ username, password }) => {
  try {
    const res = await misBaseAxios.post(`/auth/login`, {
      username: username,
      password: password,
    });
    setAccessToken(res?.data?.jwtToken);

    return res?.data?.loggedIn; //true or false
  } catch (error) {
    console.error(error);
    if (error?.response?.data?.desc) {
      toast.error(error?.response?.data?.desc);
    }
  }
};

const registerUser = async ({ username, password }) => {
  try {
    const res = await misBaseAxios.post(`/auth/register`, {
      username: username,
      password: password,
    });
    toast(res?.data?.desc, {
      icon: "👤",
    });
    return res?.data?.data;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

const getUser = async () => {
  try {
    const res = await misBaseAxios.get(`/auth/user`);
    return res?.data?.data;
  } catch (error) {
    console.log(error?.response?.data);
    if (error?.response?.data?.errTitle == "Invalid Token") {
      return null;
    }
  }
};

export { loginUser, registerUser, getUser };
