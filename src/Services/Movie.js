import { misBaseAxios } from "../api/config";

const rateMovie = async ({ movie, rate, userHasVotedBefore }) => {
  try {
    let res;
    if (!userHasVotedBefore) {
      res = await misBaseAxios.post(`/movies/rate`, {
        movie: movie,
        rate: rate,
      });
    } else {
      res = await misBaseAxios.put(`/movies/rate`, {
        movie: movie,
        rate: rate,
      });
    }
    return res?.data?.rate;
  } catch (error) {
    console.log(error);
  }
};

const getUserRates = async () => {
  try {
    const res = await misBaseAxios.get(`/movies/rate`);
    return res?.data?.rates;
  } catch (error) {
    console.log(error);
  }
};

export { rateMovie, getUserRates };
