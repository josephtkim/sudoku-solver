function getGridCopy(grid) {
  let gridSnapshot = grid.slice();
  let gridCopy = [];

  for (var r = 0; r < 9; r++) {
    let tempRow = [];
    for (var c = 0; c < 9; c++) {
      tempRow.push(gridSnapshot[r][c]);
    }
    gridCopy.push(tempRow);
  }

  return gridCopy;
}

export default getGridCopy;
