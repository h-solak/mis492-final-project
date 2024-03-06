import { misBaseAxios } from "../api/config";

const rateMovie = async ({ movie, rate, review, userHasVotedBefore }) => {
  try {
    let res;
    if (!userHasVotedBefore) {
      res = await misBaseAxios.post(`/movies/rate`, {
        movie: movie,
        rate: rate,
        review: review ? review : "",
      });
    } else {
      res = await misBaseAxios.put(`/movies/rate`, {
        movie: movie,
        rate: rate,
        review: review ? review : "",
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
