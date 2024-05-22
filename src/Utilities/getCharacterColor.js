const getCharacterColor = (character) => {
  return character == "Action Monkey"
    ? "#4E8C15"
    : character == "Drama Queen"
    ? "#F94040"
    : character == "Mystic Wizard"
    ? "#2D52D5"
    : character == "Comic Sans"
    ? "#F5AA0D"
    : character == "Romantic Warrior"
    ? "#8C248D"
    : "#89898B";
};

export default getCharacterColor;
