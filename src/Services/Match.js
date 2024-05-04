import { misBaseAxios } from "../api/config";

const sendMatrix = async (subcriteriaMatrix) => {
  try {
    const res = await misBaseAxios.post(`/match`, {
      subcriteriaMatrix,
    });
    return res?.data?.consistencyRate;
  } catch (error) {
    console.log(error);
  }
};

export { sendMatrix };
