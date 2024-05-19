function segmentation(arr) {
  let maxVal = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxVal) {
      maxVal = arr[i];
      maxIndex = i;
    }
  }

  if (maxIndex == 0) return "Romantic Warrior";
  if (maxIndex == 1) return "Drama Queen";
  if (maxIndex == 2) return "Comic Sans";
  if (maxIndex == 3) return "Mystic Wizard";
  if (maxIndex == 4) return "Action Monkey";
  else return "Equal Weights";
}

module.exports = segmentation;
