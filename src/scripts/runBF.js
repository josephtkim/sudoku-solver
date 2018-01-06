// Brute force/backtracking Algorithm
function runBF(grid) {
  // Functions to check for valid placement
  function usedInRow(grid, row, col, number) {
    for (var c = 0; c < grid.length; c++) {
      if (grid[row][c] == number) {
        return true;
      }
    }
    return false;
  }
  function usedInCol(grid, row, col, number) {
    for (var r = 0; r < grid.length; r++) {
      if (grid[r][col] == number) {
        return true;
      }
    }
    return false;
  }
  function usedInSubGrid(grid, row, col, number) {
    var root = Math.sqrt(grid.length);
    var subrow = Math.floor(row / root) * root;
    var subcol = Math.floor(col / root) * root;

    for (var r = subrow; r < subrow + root; r++) {
      for (var c = subcol; c < subcol + root; c++) {
        if (r != row || c!= col) {
          if (grid[r][c] == number) {
            return true;
          }
        }
      }
    }
    return false;
  }
  function isValidPlacement(grid, row, col, number) {
    return usedInRow(grid, row, col, number) === false &&
          usedInCol(grid, row, col, number) === false &&
          usedInSubGrid(grid, row, col, number) === false;
  }

  // Function to find and return coordinates
  // of next empty square if there is one
  function getEmptySquare(grid) {
    var coordinates = [-1, -1];

    for (var r = 0; r < grid.length; r++) {
      for (var c = 0; c < grid.length; c++) {
        if (grid[r][c] == 0) {
          coordinates[0] = r;
          coordinates[1] = c;
          return coordinates;
        }
      }
    }
    return coordinates;
  }

  // Recursive function to solve sudoku puzzle
  function solveSudoku(grid) {
    namespace.steps += 1;

    if (namespace.steps > 999900) {
      return false;
    }

    var emptyCell = getEmptySquare(grid);
    var emptyRow = emptyCell[0];
    var emptyCol = emptyCell[1];

    if (emptyRow === -1 && emptyCol === -1) {
      namespace.steps -= 1;
      return true;
    }

    for (var num = 1; num <= grid.length; num++) {
      if (isValidPlacement(grid, emptyRow, emptyCol, num)) {
        // Set the empty square to a number
        grid[emptyRow][emptyCol] = num;
        // Try recursively solving from this placement
        if (solveSudoku(grid)) {
          return true;
        }
        // Eventually, it might return false. If so,
        // reset the value to 0
        grid[emptyRow][emptyCol] = 0;
      }
    }
    // If for loop ends, and there is no placement for
    // any value, it will backtrack
    return false;
  }

  let namespace = {
    solutionFound: false, // Flag to prevent recursion
    answerToSudoku: [], // answer as sudoku grid
    steps: 0
  }

  if (solveSudoku(grid)) {
    namespace.solutionFound = true;
    namespace.answerToSudoku = grid;
    return namespace;
  } else {
    return namespace;
  }
}

export default runBF;
