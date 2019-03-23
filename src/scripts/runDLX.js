// Test function to export and import
function runDLX(inputBoard) {
  // ==== Code for Sparse Matrix ====
  class Node {
    constructor(row, col) {
      this.left = null;
      this.right = null;
      this.up = null;
      this.down = null;
      this.row = row;
      this.col = col;
      this.colHead = null;
    }
  }
  class colNode extends Node { // Special node for column heads
    constructor(row, col, id) {
      super(row, col);
      this.nodeCount = 0; // number of nodes in the column
      this.id = id;
    }
  }

  // Helper functions to get next node in sparse matrix
  function getUp(row, nRows) {
    if (row === 0) {
      return nRows - 1;
    } else {
      return row - 1;
    }
  }
  function getDown(row, nRows) {
    if (row + 1 >= nRows) {
      return 0;
    } else {
      return row + 1;
    }
  }
  function getRight(col, nCols) {
    if (col + 1 >= nCols) {
      return 0;
    } else {
      return col + 1;
    }
  }
  function getLeft(col, nCols) {
    if (col === 0) {
      return nCols - 1;
    } else {
      return col - 1;
    }
  }

  // Function to take in 2D matrix and create Sparse Matrix
  function makeSparseMatrix(matrix) {
    var h = new colNode();
    var rowCount = matrix.length;
    var colCount = matrix[0].length;
    // Initialize empty sparse matrix.
    // Add each row into matrix as empty list.
    var sparseMatrix = [];
    for (var i = 0; i < rowCount; i++) {
      sparseMatrix.push([]);
    }

    // Insert column headers
    // This is row 0
    for (var j = 0; j < colCount; j++) {
      var tempColHeader = new colNode(0, j, "colHead");
      tempColHeader.colHead = tempColHeader;
      sparseMatrix[0].push(tempColHeader);
    }

    // Construct the rows and columns
    // Start from row 1, right below the column head row
    for (var i = 1; i < rowCount; i++) {
      for (var j = 0; j < colCount; j++) {
        // If the value is nonzero/nonempty, create node for it.
        if (matrix[i][j] !== 0) {
          // Increment column header node count
          sparseMatrix[0][j].nodeCount += 1;
          var tempNode = new Node(i, j);
          tempNode.colHead = sparseMatrix[0][j];
          sparseMatrix[i].push(tempNode);
        } else { // Otherwise, set position to null.
          sparseMatrix[i].push(null);
        }
      }
    }

    // After nodes are created, link them up
    for (var r = 0; r < sparseMatrix.length; r++) {
      for (var c = 0; c < sparseMatrix[r].length; c++) {
        var curNode = sparseMatrix[r][c];

        if (curNode !== null) {
          var row = curNode.row;
          var col = curNode.col;
          // Searching for nonempty node above
          var currow = getUp(row, rowCount);
          while (matrix[currow][col] === 0 && currow !== row) {
            currow = getUp(currow, rowCount);
          }
          curNode.up = sparseMatrix[currow][col];
          // Searching for nonempty node below
          var currow = getDown(row, rowCount);
          while (matrix[currow][col] === 0 && currow !== row) {
            currow = getDown(currow, rowCount);
          }
          curNode.down = sparseMatrix[currow][col];
          // Searching for nonempty node to the left
          var curcol = getLeft(col, colCount);
          while (matrix[row][curcol] === 0 && curcol !== col) {
            curcol = getLeft(curcol, colCount);
          }
          curNode.left = sparseMatrix[row][curcol];
          // Searching for nonempty node to the right
          var curcol = getRight(col, colCount);
          while (matrix[row][curcol] === 0 && curcol !== col) {
            curcol = getRight(curcol, colCount);
          }
          curNode.right = sparseMatrix[row][curcol];
        }
      }
    }
    // Link head sentinal node with the first and last column heads
    h.right = sparseMatrix[0][0];
    sparseMatrix[0][0].left = h;
    h.left = sparseMatrix[0][colCount - 1];
    sparseMatrix[0][colCount - 1].right = h;

    // return sparse matrix
    return sparseMatrix;
  }

  // Helper function to take in matrix, and return sparse matrix
  function makeSparseMatrixHelper(matrix) {
    var rows = matrix.length;
    var cols = matrix[0].length;
    var temp = [];
    var headerRow = [];

    // Add row of 10's at the top to compensate for column head row.
    // Makes it easier to map matrix rows to sparse matrix.
    for (var c = 0; c < cols; c++) {
      headerRow.push(10);
    }
    temp.push(headerRow);

    // Add each row from matrix
    for (var r = 0; r < rows; r++) {
      temp.push(matrix[r]);
    }

    // Create and return the sparse matrix
    var m = makeSparseMatrix(temp);
    return m;
  }


  // ==== DLX (Dancing Links Algorithm) Implementation ====
  function minColumnNodes(h) { // function to get col with least nodes
    var header = h;
    var min = h.right;
    header = min.right;
    while (header !== h) {
      if (header.nodeCount < min.nodeCount) {
        min = header;
      }
      header = header.right;
    }
    return min;
  }

  // Function to cover a specified node in sparse matrix
  function cover(node, sparseMatrix) {
    namespace.steps += 1;
    var colNode = node.colHead;
    // Unlink the column head
    colNode.left.right = colNode.right;
    colNode.right.left = colNode.left;
    // Move down through each row from column Head
    for (var row = colNode.down; row !== colNode; row = row.down) {
      for (var rightNode = row.right; rightNode !== row; rightNode = rightNode.right) {
        // Unlink nodes from row
        rightNode.up.down = rightNode.down;
        rightNode.down.up = rightNode.up;
        // decrement node count from column head
        sparseMatrix[0][rightNode.col].nodeCount -= 1;        
      }
    }
  }

  // Function to uncover a given node. Reverse of cover function.
  function uncover(node, sparseMatrix) {
    namespace.steps += 1;
    var colNode = node.colHead;
    // Uncover from bottom up, reverse of cover
    for (var row = colNode.up; row !== colNode; row = row.up) {
      for (var leftNode = row.left; leftNode !== row; leftNode = leftNode.left) {
        // Reconnecting each node to up and down nodes
        leftNode.up.down = leftNode;
        leftNode.down.up = leftNode;
        sparseMatrix[0][leftNode.col].nodeCount += 1;        
      }
    }
    colNode.left.right = colNode;
    colNode.right.left = colNode;
  }

  // Function to construct and store the answer
  function printAnswer(s) {
    var test = [];
    for (var i = 0; i < s.length; i++) {
      test.push(namespace.reducedSudoku[s[i].row - 1]);
    }
    namespace.answer = test;
  }

  // Function to search for an exact cover
  function search(sparseMatrix, h, k, s) {    
    if (h.right === h) {
      namespace.solutionFound = true; // flag as solved
      printAnswer(s);      
      return;
    }
    else {
      // Recursively run on each node
      var col = minColumnNodes(h);
      cover(col, sparseMatrix);
      for (var rowNode = col.down; rowNode !== col; rowNode = rowNode.down) {
        s.push(rowNode);
        for (var rightNode = rowNode.right; rightNode !== rowNode; rightNode = rightNode.right) {
          cover(rightNode, sparseMatrix);
        }
        if (namespace.solutionFound === true) { // If solved, exit
          return;
        }
        search(sparseMatrix, h, k + 1, s);
        // If no solution, backtrack
        s.pop();
        col = rowNode.colHead;
        for (var leftNode = rowNode.left; leftNode !== rowNode; leftNode = leftNode.left) {
          uncover(leftNode, sparseMatrix);
        }
      }
      uncover(col, sparseMatrix);
    }
  }

  // From column and row, get the box in grid. Zero-indexed.
  function colrowToBox(row, col, size) {
    var root = Math.sqrt(size);
    return (row - (row % root)) + Math.floor(col / root);
  }

  // Function to translation a square to a exact cover row.
  function encodeRow(row, col, box, num, gridSize) {
    num = num - 1; // Offset by 1 because zero indexed.

    // Create 324 column row
    var columnCount = gridSize * gridSize * 4;
    var output = [];
    for (var i = 0; i < columnCount; i++) {
      output.push(0);
    }

    // Cell Constraint: cols 1 - 81
    var columnOffset = 0;
    output[columnOffset + (row * 9) + col] = 1;
    // Row Constraint: cols 82 = 162
    columnOffset += 81;
    output[columnOffset + (row * 9) + num] = 1;
    // Col Constraint: cols 163 - 243
    columnOffset += 81;
    output[columnOffset + (col * 9) + num] = 1;
    // Box Constraint: cols 244 - 324
    columnOffset += 81;
    output[columnOffset + (box * 9) + num] = 1;

    return output;
  }

  // Decode exact cover row to a Sudoku square
  function decode(row) {
    var list = [0,0,0];
    // Get the row and col
    for (var i = 0; i < 81; i++) {
      if (row[i] === 1) {
        var c = i % 9;
        var r = Math.floor((i - c) / 9);

        list[0] = r;
        list[1] = c;
        break;
      }
    }
    // Get the row and num
    for (var j = 81; j < 162; j++) {
      if (row[j] === 1) {
        var temp = j - 81;

        var num = temp % 9;
        var r = Math.floor((temp - num) / 9);

        num += 1; // Change back from zero-indexed to 1-9
        list[2] = num;
        break;
      }
    }
    // list contains [row, column, value]
    return list;
  }

  // ==== Implementing Sudoku to the exact cover problem. ====
  // Change Sudoku grid to a cover matrix
  function sudokuToCover(grid) {
    var matrix = [];
    var length = grid.length;

    for (var i = 0; i < length; i++) { // Go through each row
      for (var j = 0; j < length; j++) { // Go through each column
        if (grid[i][j] === 0) { // If a value is 0 (empty), add the rows for possible choices
          for (var n = 1; n <= 9; n++) {
            // Add rows for each 9 possible number in that square
            var box = colrowToBox(i, j, length);
            var temp = encodeRow(i, j, box, n, length);
            matrix.push(temp);
          }
        }
        else { // Square is not empty, so just add the only possible exact cover row
          var box = colrowToBox(i, j, length);
          var temp = encodeRow(i, j, box, grid[i][j], length);
          matrix.unshift(temp);
        }
      }
    }

    return matrix;
  }

  // Function to take exact cover solution, and then return it as a sudoku baord.
  function SolutionToSudoku(solution) {
    var board = [];
    // Initialize empty grid of 81 squares
    for (var i = 0; i < 9; i++) {
      var row = [];
      board.push(row);
      for (var j = 0; j < 9; j++) {
        board[i].push(0);
      }
    }
    // Fill in each square with solved value
    for (var k = 0; k < solution.length; k++) {
      var info = decode(solution[k]);
      var r = info[0];
      var c = info[1];
      var val = info[2];
      board[r][c] = val;
    }

    return board;
  }

  // Run the functions to solve a given grid
  function runSolver(grid) {
    // Reduce Sudoku board to exact cover problem
    namespace.reducedSudoku = sudokuToCover(grid);
    // Reduce exact cover to sparse matrix
    var coverToSparse = makeSparseMatrixHelper(namespace.reducedSudoku);
    // Solve DLX for sparse matrix
    var h = coverToSparse[0][0].left;

    // Solve
    search(coverToSparse, h, 0, []);
    namespace.answerToSudoku = SolutionToSudoku(namespace.answer);
  }

  // Object to store important variables and prevent globals.
  let namespace = {
    reducedSudoku: [], // Sudoku as exact cover
    solutionFound: false, // Flag to prevent recursion
    answer: [], // List of solution rows from sparse matrix
    answerToSudoku: [], // answer as sudoku grid
    steps: 0 // Keep track of how many search iterations run
  }

  let gridSnapshot = inputBoard.slice();
  let gridCopy = [];

  for (var r = 0; r < 9; r++) {
    let tempRow = [];
    for (var c = 0; c < 9; c++) {
      tempRow.push(gridSnapshot[r][c]);
    }
    gridCopy.push(tempRow);
  }

  runSolver(gridCopy);
  // alert("Returned answer is " + namespace.answerToSudoku + " steps: " + namespace.steps);
  return namespace;
}

export default runDLX;
