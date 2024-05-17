const convertMatrixElementValue = (value) => {
  const intValue = parseInt(value);
  switch (intValue) {
    case 9:
      return 9;
    case 8:
      return 7;
    case 7:
      return 5;
    case 6:
      return 3;
    case 5:
      return 1;
    case 4:
      return 1 / 3;
    case 3:
      return 1 / 5;
    case 2:
      return 1 / 7;
    case 1:
      return 1 / 9;
    default:
      return 1;
  }
};

export default convertMatrixElementValue;
