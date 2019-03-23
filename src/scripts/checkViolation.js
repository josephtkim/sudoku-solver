// Checks grid for any violations,
// and return a new grid with
// violations marked on the squares
function checkViolation(grid) {
  var violationGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  var violationFlag = false;

  // Logic:
  // Go through each cell. If cell has violation, mark the violation grid.
  function hasViolation(grid) {
  	for (var r = 0; r < grid.length; r++) {
  		for (var c = 0; c < grid.length; c++) {
  			if (
  				checkRow(grid, r, c) === false ||
  				checkCol(grid, r, c) === false ||
  				checkSubgrid(grid, r, c) === false) {
  				violationGrid[r][c] = "X";
  				violationFlag = true;
  			}
  		}
  	}
  	return true;
  }

  // Functions return false if there is a violation
  function checkRow(grid, row, col) {
  	var current = grid[row][col];
  	if (current > 0 && current < 10) {
    	for (var c = 0; c < grid.length; c++) {
    		if (c !== col) {
    			if (current === grid[row][c]) {
    				return false;
    			}
    		}
    	}
  	}
  	return true;
  }

  function checkCol(grid, row, col) {
  	var current = grid[row][col];
  	if (current > 0 && current < 10) {
    	for (var r = 0; r < grid.length; r++) {
    		if (r !== row) {
    			if (current === grid[r][col]) {
    				return false;
    			}
    		}
    	}
  	}
  	return true;
  }

  function checkSubgrid(grid, row, col) {
  	var root = Math.sqrt(grid.length);
  	var subrow = Math.floor(row / root) * root;
  	var subcol = Math.floor(col / root) * root;
  	if (grid[row][col] > 0 && grid[row][col] < 10) {
    	for (var r = subrow; r < subrow + root; r++) {
    		for (var c = subcol; c < subcol + root; c++) {
    			if (r !== row || c !== col) {
    				if (grid[r][c] === grid[row][col]) {
    					return false;
    				}
    			}
    		}
    	}
  	}
  	return true;
  }

  hasViolation(grid);
  return [violationFlag, violationGrid];
}

export default checkViolation;
