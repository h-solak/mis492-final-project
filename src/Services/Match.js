import { misBaseAxios } from "../api/config";

const matchUser = async (matrices) => {
  try {
    const res = await misBaseAxios.post(`/match`, {
      matrices,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

const checkConsistency = async (subcriteriaMatrix, dimension) => {
  try {
    const res = await misBaseAxios.post(`/match/check-consistency`, {
      subcriteriaMatrix,
      dimension,
    });
    return res?.data?.consistencyRate;
  } catch (error) {
    console.log(error);
  }
};

export { matchUser, checkConsistency };
