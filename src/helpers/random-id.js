const randomId = () => {
  let idLength = 10;
  let id = "";
  const numberAndString = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  for (let i = 0; i < idLength; i++) {
    id += numberAndString[Math.floor(Math.random() * numberAndString.length) + 1];
  }

  return id;
};

export default randomId;
