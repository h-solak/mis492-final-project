import { misBaseAxios } from "../api/config";

const createWatchlist = async ({ title }) => {
  try {
    const res = await misBaseAxios.post(`/watchlist`, { title });
    return res?.data?.watchlist;
  } catch (error) {
    console.log(error);
  }
};

const addToDefaultWatchlist = async ({
  id,
  title,
  posterPath,
  releaseDate,
}) => {
  try {
    const res = await misBaseAxios.post(`/watchlist`, {
      id,
      title,
      posterPath,
      releaseDate,
    });
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
