import { misBaseAxios } from "../api/config";

const getChatList = async () => {
  try {
    const res = await misBaseAxios.get(`/chats`);
    return res?.data?.chats;
  } catch (error) {
    console.log(error);
  }
};

export { getChatList };
