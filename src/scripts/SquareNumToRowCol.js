function SquareNumToRowCol(squareNumber) {
  var coordinates = [0,0];
  // How to get the square number
  var row = Math.ceil(squareNumber / 9);
  var col = squareNumber - (row * 9) + 9;
  coordinates[0] = row;
  coordinates[1] = col;
  return coordinates;
}

export default SquareNumToRowCol;
