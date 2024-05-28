import toast from "react-hot-toast";
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

const updateUser = async ({ username, gender, city, birthday, about }) => {
  try {
    const res = await misBaseAxios.put(`/user`, {
      username,
      gender,
      city,
      birthday,
      about,
    });
    if (!res?.data?.isAgeOver18) {
      toast.error("You have to be over 18!");
      setTimeout(() => {
        toast.success("Other changes saved successfully!");
      }, 1000);
    } else {
      toast.success("Changes saved successfully!");
    }

    return res?.data?.user;
  } catch (error) {
    if (error?.response?.data?.keyValue?.username?.length > 0) {
      toast.error(
        "This username is already in use: " +
          error?.response?.data?.keyValue?.username
      );
    } else {
      toast.error("Something went wrong!");
    }
    console.log(error);
  }
};

const changePrivacySettings = async (newSettings) => {
  try {
    const res = await misBaseAxios.put(`/user/privacy`, {
      profileVisible: !!newSettings?.profileVisible,
      friendsListVisible: !!newSettings?.friendsListVisible,
      matchedFriendsVisible: !!newSettings?.matchedFriendsVisible,
    });
    console.log("aga nası", {
      profileVisible: !!newSettings?.profileVisible,
      friendsListVisible: !!newSettings?.friendsListVisible,
      matchedFriendsVisible: !!newSettings?.matchedFriendsVisible,
    });
    return res?.data?.user;
  } catch (error) {
    console.log(error);
  }
};

export {
  getProfileUser,
  getProfileUserUsingId,
  updateUser,
  changePrivacySettings,
};
