import { misBaseAxios } from "../api/config";

const matchUser = async ({ genderFilter, ageRange, cityFilter }) => {
  try {
    const res = await misBaseAxios.get(
      `/match?genderFilter=${genderFilter}&ageRange1=${ageRange[0]}&ageRange2=${ageRange[1]}&cityFilter=${cityFilter}`
    );
    return res?.data?.user;
  } catch (error) {
    console.log(error);
  }
};

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

export { matchUser, getUserSurveyResults, checkConsistency };
