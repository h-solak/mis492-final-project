import { misBaseAxios } from "../api/config";

/* Get all chats */
const getChatList = async () => {
  try {
    const res = await misBaseAxios.get(`/chats`);
    return res?.data?.chats;
  } catch (error) {
    console.log(error);
  }
};

/* Get a spesific chat by using chat id*/
const getChat = async ({ chatId }) => {
  try {
    const res = await misBaseAxios.get(`/chats/${chatId}`);
    return res?.data?.chat;
  } catch (error) {
    console.log(error);
  }
};

/* Send Message */
const sendMessage = async ({ chatId, content }) => {
  try {
    const res = await misBaseAxios.post(`/chats/${chatId}/message`, {
      content: content,
    });
    return res?.data?.chatId;
  } catch (error) {
    console.log(error);
  }
};

/* Send Message */
const deleteMessage = async ({ chatId, messageId }) => {
  try {
    const res = await misBaseAxios.delete(
      `/chats/${chatId}/message/${messageId}`
    );
    return res?.data?.chatId;
  } catch (error) {
    console.log(error);
  }
};

/* Create or get a chat id by providing the second user's id */
const getChatIdByUserId = async (userId, isMatchChat = false) => {
  try {
    const res = await misBaseAxios.get(
      `/chats/user/${userId}?isMatchChat=${isMatchChat}`
    );
    return res?.data?.chatId; //if chat is created or it already exists, backend will return chatId
  } catch (error) {
    console.log(error);
  }
};

export { getChatList, getChat, getChatIdByUserId, sendMessage, deleteMessage };
