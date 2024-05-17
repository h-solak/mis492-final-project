const User = require("../models/User");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const ahp = require("ahp-lite");
const linearAlgebra = require("linear-algebra")();
const Matrix = linearAlgebra.Matrix;

// const front = {
//   row1: [1, 2, 3],
//   row2: [4, 5, 6],
//   row3: [7, 8, 9],
// };

router.post("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const subCriteriaMatrix = req.body.subcriteriaMatrix;

    row1Formatted = subCriteriaMatrix?.row1?.map((number) =>
      parseFloat(number)
    );
    row2Formatted = subCriteriaMatrix?.row2?.map((number) =>
      parseFloat(number)
    );
    row3Formatted = subCriteriaMatrix?.row3?.map((number) =>
      parseFloat(number)
    );
    row4Formatted = subCriteriaMatrix?.row4?.map((number) =>
      parseFloat(number)
    );
    row5Formatted = subCriteriaMatrix?.row5?.map((number) =>
      parseFloat(number)
    );

    console.log([
      row1Formatted,
      row2Formatted,
      row3Formatted,
      row4Formatted,
      row5Formatted,
    ]);
    //   [
    //    1,1/6,1/3,
    //    6,1,1/3,
    //    3,3,1,
    //   ]

    // [1,   1/2, 3]
    // [2,   1,   4]
    // [1/3, 1/4, 1]

    const subCriteriaMatrixFormed = new Matrix([
      row1Formatted,
      row2Formatted,
      row3Formatted,
      row4Formatted,
      row5Formatted,
    ]);

    const ahpResult = ahp.getWeights(subCriteriaMatrixFormed);

    console.log(ahpResult);

    return res.status(200).json({ consistencyRate: ahpResult?.cr });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
