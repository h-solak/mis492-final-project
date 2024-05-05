import { misBaseAxios } from "../api/config";

const createWatchlist = async ({ title }) => {
  try {
    const res = await misBaseAxios.post(`/watchlist`, { title });
    return res?.data?.watchlist;
  } catch (error) {
    console.log(error);
  }
};

export { getMovieReviews };
