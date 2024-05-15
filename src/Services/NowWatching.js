import { misBaseAxios } from "../api/config";

const setNowWatching = async ({ movie }) => {
  try {
    const res = await misBaseAxios.post(`/nowWatching`, { movie });
    return res?.data?.nowWatching;
  } catch (error) {
    console.log(error);
  }
};

const removeNowWatching = async () => {
  try {
    const res = await misBaseAxios.delete(`/nowWatching`);
    return res?.data?.nowWatching;
  } catch (error) {
    console.log(error);
  }
};

export { setNowWatching, removeNowWatching };
