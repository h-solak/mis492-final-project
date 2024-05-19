import { misBaseAxios } from "../api/config";

const getUserSurveyResults = async (matrices) => {
  try {
    const res = await misBaseAxios.post(`/match/character-survey`, {
      matrices,
    });
    return res?.data?.personality;
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

export { getUserSurveyResults, checkConsistency };
