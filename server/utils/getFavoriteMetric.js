function getFavoriteMetric(metricMatrix) {
  const arr = metricMatrix?.data[0];
  let maxVal = arr[0];
  let maxIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxVal) {
      maxVal = arr[i];
      maxIndex = i;
    }
  }

  if (maxIndex == 0) return "Fluidity";
  if (maxIndex == 1) return "Visual and Technical Elements";
  if (maxIndex == 2) return "Emotional Impact";
  return "Fluidity";
}

module.exports = getFavoriteMetric;
