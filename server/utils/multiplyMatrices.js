function multiplyMatrices(matrix1, matrix2) {
  let result = [];
  for (let i = 0; i < matrix1.length; i++) {
    let row = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix1[i].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }
  return result;
}

module.exports = multiplyMatrices;
