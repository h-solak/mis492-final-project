import { misBaseAxios } from "../api/config";

const createWatchlist = async ({ title }) => {
  try {
    const res = await misBaseAxios.post(`/watchlist/create`, { title });
    return res?.data?.user;
  } catch (error) {
    console.log(error);
  }
};

const addMovieToCustomWatchlist = async ({
  watchlistId,
  movieId,
  title,
  posterPath,
  releaseDate,
}) => {
  try {
    const res = await misBaseAxios.post(
      `/watchlist/custom-watchlist/${watchlistId}}`,
      {
        movieId,
        title,
        posterPath,
        releaseDate,
      }
    );
    return res?.data?.user;
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomWatchlist = async (watchlistId) => {
  try {
    const res = await misBaseAxios.delete(
      `/watchlist/custom-watchlist/delete/${watchlistId}}`
    );
    return res?.data?.success || false;
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

export {
  addMovieToCustomWatchlist,
  deleteCustomWatchlist,
  createWatchlist,
  addToDefaultWatchlist,
  removeFromDefaultWatchlist,
};
