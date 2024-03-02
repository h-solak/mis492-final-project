import { misBaseAxios } from "../api/config";

const createPost = async ({ content }) => {
  try {
    const res = await misBaseAxios.post(`/posts`, {
      content: content,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

const getProfilePosts = async () => {
  try {
    const res = await misBaseAxios.get(`/posts`);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export { createPost, getProfilePosts };
