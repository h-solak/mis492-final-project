import { tmdbBaseAxios } from "../api/config";
//https://api.themoviedb.org/3/genre/movie/list?api_key=${application.api_key}

const tmdbAPIKey = import.meta.env.VITE_TMDB_API_KEY;

const searchMovie = async (searchText, page = 1) => {
  console.log(tmdbAPIKey);
  try {
    const res = await tmdbBaseAxios.get(
      `/search/movie?api_key=${tmdbAPIKey}&language=en-US&page=${page}&include_adult=false&query=${searchText}`
    );
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

export { searchMovie };
