const ahp = require("ahp-lite");
const linearAlgebra = require("linear-algebra")();

const calculateAhp = (subCriteriaMatrix, dimension) => {
  try {
    const Matrix = linearAlgebra.Matrix;
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

    return ahpResult;
  } catch (err) {
    console.log(err);
  }
};

module.exports = calculateAhp;
