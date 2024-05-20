import { tmdbBaseAxios } from "../api/config";
//https://api.themoviedb.org/3/genre/movie/list?api_key=${application.api_key}

const tmdbAPIKey = import.meta.env.VITE_TMDB_API_KEY;

const searchMovie = async (searchText, page = 1) => {
  try {
    const res = await tmdbBaseAxios.get(
      `/search/movie?api_key=${tmdbAPIKey}&language=en-US&page=${page}&include_adult=false&query=${searchText}`
    );
    return res?.data;
  } catch (err) {
    console.error(err);
  }
};

// https://api.themoviedb.org/3/movie/{movie_id}

const getMovieDetails = async (movieId) => {
  try {
    const res = await tmdbBaseAxios.get(
      `/movie/${movieId}?api_key=${tmdbAPIKey}`
    );
    return res?.data;
  } catch (err) {
    console.error(err);
  }
};

// https://api.themoviedb.org/3/movie/now_playing
const getReleaseRadar = async (movieId) => {
  try {
    const res = await tmdbBaseAxios.get(
      `/movie/now_playing?api_key=${tmdbAPIKey}`
    );
    return res?.data;
  } catch (err) {
    console.error(err);
  }
};

//multi search
const searchMulti = async (queryText, page = 1) => {
  try {
    const res = await tmdbBaseAxios.get(
      `/search/multi?api_key=${tmdbAPIKey}&query=${queryText}&include_adult=false&language=en-US&page=${page}`
    );
    return res?.data;
  } catch (err) {
    console.error(err);
  }
};

//Genre Ids --> Drama: 18, Comedy: 35, Action: 28, Mystery: 9648, Romance: 10749
//https://api.themoviedb.org/3/discover/movie
const discoverMovies = async ({ withGenreIds, withoutGenreIds }) => {
  try {
    const res = await tmdbBaseAxios.get(
      `/discover/movie?api_key=${tmdbAPIKey}&with_genres=${withGenreIds.join(
        ","
      )}&without_genres=${withoutGenreIds.join(",")}`
    );
    return res?.data;
  } catch (err) {
    console.error(err);
  }
};

//get movie recommendations based on a movie
const getRecommendationsForAMovie = async (movieId) => {
  try {
    const res = await tmdbBaseAxios.get(
      `/movie/${movieId}/recommendations?api_key=${tmdbAPIKey}`
    );
    return res?.data;
  } catch (err) {
    console.error(err);
  }
};

//get streaming services https://api.themoviedb.org/3/movie/{movie_id}/watch/providers
// response.data.TR türkiye oluyor
export {
  searchMovie,
  getMovieDetails,
  getReleaseRadar,
  searchMulti,
  discoverMovies,
};
