const User = require("../models/User");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");
const calculateAhp = require("../utils/calculateAhp");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const ahp = require("ahp-lite");
const multiplyMatrices = require("../utils/multiplyMatrices");
const segmentation = require("../utils/segmentation");
const linearAlgebra = require("linear-algebra")();
const Matrix = linearAlgebra.Matrix;

//match request
router.post("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);

    const user = await User.findById(id);

    //users have to have a personality
    if (!user?.personality?.type?.character?.length > 0) {
      return res.status(500).json(err);
    }
    //find other user --> filter: has same personality type, not a friend,

    return res.status(200).json({ personality: userPersonality });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//take or re-take character survey
router.post("/character-survey", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const matrices = req.body.matrices;

    console.log("FRONTTAN GELEN MATRİSLER", matrices);

    const evaluatedVfe3x3matrix = new Matrix([
      calculateAhp(matrices.vfe3x3matrix, 3).ev,
    ]);
    const evaluatedVisual5x5Matrix = new Matrix([
      calculateAhp(matrices.visual5x5matrix, 5).ev,
    ]);
    const evaluatedFluidity5x5Matrix = new Matrix([
      calculateAhp(matrices.fluidity5x5matrix, 5).ev,
    ]);
    const evaluatedEmotional5x5Matrix = new Matrix([
      calculateAhp(matrices.emotional5x5matrix, 5).ev,
    ]);

    console.log("111111", evaluatedVisual5x5Matrix.data);
    console.log("222222", evaluatedFluidity5x5Matrix.data);
    console.log("333333", evaluatedEmotional5x5Matrix.data);

    // Ensure matrices are correctly formatted for multiplication
    const firstMatrix = new Matrix([
      calculateAhp(matrices.visual5x5matrix, 5).ev,
      calculateAhp(matrices.fluidity5x5matrix, 5).ev,
      calculateAhp(matrices.emotional5x5matrix, 5).ev,
    ]);

    console.log("First Matrix before transpose", firstMatrix.data);

    const transposedFirstMatrix = firstMatrix.trans();
    const transposedSecondMatrix = evaluatedVfe3x3matrix.trans();

    console.log("Transposed First Matrix", transposedFirstMatrix.data);
    console.log("Transposed Second Matrix", transposedSecondMatrix.data);

    // Ensure transposed matrices are properly formatted for multiplication
    const formattedTransposedFirstMatrix = new Matrix(
      transposedFirstMatrix.data
    );
    const formattedTransposedSecondMatrix = new Matrix(
      transposedSecondMatrix.data
    );

    const beforeResult1 = formattedTransposedFirstMatrix.data;
    const beforeResult2 = formattedTransposedSecondMatrix.data;

    console.log("beforeResult1", formattedTransposedFirstMatrix.data);
    console.log("beforeResult2", formattedTransposedSecondMatrix.data);

    const resultMatrix5x1 = multiplyMatrices(beforeResult1, beforeResult2);
    console.log("FINAL", resultMatrix5x1);

    const segmentatedResult = segmentation(resultMatrix5x1);

    console.log("FINAL SEGMENTASYON", segmentatedResult);

    const user = await User.findById(id);
    const userPersonality = {
      type: segmentatedResult,
      resultMatrix: resultMatrix5x1,
    };

    user.personality = userPersonality;
    await user.save();

    return res.status(200).json({ personality: userPersonality });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/check-consistency", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const subCriteriaMatrix = req.body.subcriteriaMatrix;
    const dimension = parseInt(req.body.dimension); //3 or 5

    let subCriteriaMatrixFormed3x3;
    let subCriteriaMatrixFormed5x5;
    let row1Formatted;
    let row2Formatted;
    let row3Formatted;
    let row4Formatted;
    let row5Formatted;

    row1Formatted = subCriteriaMatrix?.row1?.map((number) =>
      parseFloat(number)
    );
    row2Formatted = subCriteriaMatrix?.row2?.map((number) =>
      parseFloat(number)
    );
    row3Formatted = subCriteriaMatrix?.row3?.map((number) =>
      parseFloat(number)
    );

    //if dimension == 3
    subCriteriaMatrixFormed3x3 = new Matrix([
      row1Formatted,
      row2Formatted,
      row3Formatted,
    ]);

    if (dimension == 5) {
      row4Formatted = subCriteriaMatrix?.row4?.map((number) =>
        parseFloat(number)
      );
      row5Formatted = subCriteriaMatrix?.row5?.map((number) =>
        parseFloat(number)
      );
      subCriteriaMatrixFormed5x5 = new Matrix([
        row1Formatted,
        row2Formatted,
        row3Formatted,
        row4Formatted,
        row5Formatted,
      ]);
    }

    console.log(
      dimension == 3 ? subCriteriaMatrixFormed3x3 : subCriteriaMatrixFormed5x5
    );
    const ahpResult = ahp.getWeights(
      dimension == 3 ? subCriteriaMatrixFormed3x3 : subCriteriaMatrixFormed5x5
    );
    console.log(ahpResult);

    /*
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    at this point you should JUST CREATE THE ATTRIBUTE
    userQuizResult: {
      values: ...,
      type: "drama queen"
    }
    
    *MATCH ŞARTLARI: 
    -Friends olmayacak
    -AGE --> 
    -GENDER --> 
    -CITY? --> 
    -USER TYPE --> Drama Queen

    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    */

    return res.status(200).json({ consistencyRate: ahpResult?.cr });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
