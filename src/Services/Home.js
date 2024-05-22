import { misBaseAxios } from "../api/config";

const getHome = async () => {
  try {
    const res = await misBaseAxios.get(`/home`);
    return res?.data?.home;
  } catch (error) {
    console.log(error);
  }
};

export { getHome };
