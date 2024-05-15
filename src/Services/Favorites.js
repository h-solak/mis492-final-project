import { misBaseAxios } from "../api/config";

const addToFavorites = async ({ movieId }) => {
  try {
    const res = await misBaseAxios.post(`/favorites`, { movieId });
    return res?.data?.favorites;
  } catch (error) {
    console.log(error);
  }
};

const removeFromFavorites = async ({ movieId }) => {
  try {
    const res = await misBaseAxios.delete(`/favorites/${movieId}`);
    return res?.data?.favorites;
  } catch (error) {
    console.log(error);
  }
};

export { addToFavorites, removeFromFavorites };
