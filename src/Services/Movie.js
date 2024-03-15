import { misBaseAxios } from "../api/config";

const rateMovie = async ({
  movie,
  rate,
  review,
  moviePoster,
  movieTitle,
  userHasVotedBefore,
}) => {
  try {
    let res;
    if (!userHasVotedBefore) {
      res = await misBaseAxios.post(`/movie/rate`, {
        movie: movie,
        rate: rate,
        review: review ? review : "",
        moviePoster: moviePoster,
        movieTitle: movieTitle,
      });
    } else {
      res = await misBaseAxios.put(`/movie/rate`, {
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

//the user's all previous rates/reviews
const getUserMovieRates = async () => {
  try {
    const res = await misBaseAxios.get(`/movie/rates`);
    return res?.data?.rates;
  } catch (error) {
    console.log(error);
  }
};

//a movie's reviews (written reviews)
const getMovieReviews = async (movieId) => {
  try {
    const res = await misBaseAxios.get(`/movie/${movieId}/reviews`);
    return res?.data?.reviews;
  } catch (error) {
    console.log(error);
  }
};

export { rateMovie, getUserMovieRates, getMovieReviews };
