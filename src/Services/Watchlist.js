import { misBaseAxios } from "../api/config";

const createWatchlist = async ({ title }) => {
  try {
    const res = await misBaseAxios.post(`/watchlist`, { title });
    return res?.data?.watchlist;
  } catch (error) {
    console.log(error);
  }
};

const addToDefaultWatchlist = async ({ movieId }) => {
  try {
    const res = await misBaseAxios.post(`/watchlist`, { movieId });
    return res?.data?.watchlist;
  } catch (error) {
    console.log(error);
  }
};

const removeFromDefaultWatchlist = async ({ movieId }) => {
  try {
    const res = await misBaseAxios.delete(`/watchlist/${movieId}`);
    return res?.data?.watchlist;
  } catch (error) {
    console.log(error);
  }
};

export { createWatchlist, addToDefaultWatchlist, removeFromDefaultWatchlist };
