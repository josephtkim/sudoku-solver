// Check that current grid is complete and valid
function checkComplete(grid) {

  function checkValid(grid) {
  	// For each cell check whether valid in:
  	// 1. Row 2. Column 3. Subgrid
  	for (var r = 0; r < grid.length; r++) {
  		for (var c = 0; c < grid.length; c++) {
  			if (
  				checkRow(grid, r, c) === false ||
  				checkCol(grid, r, c) === false ||
  				checkSubgrid(grid, r, c) === false ||
  				grid[r][c] < 1 || grid[r][c] > grid.length) {
  				return false;
  			}
  		}
  	}
  	return true;
  }

  function checkRow(grid, row, col) {
  	var current = grid[row][col];
  	for (var c = 0; c < grid.length; c++) {
  		if (c != col) {
  			if (current == grid[row][c]) {
  				return false;
  			}
  		}
  	}
  	return true;
  }

  function checkCol(grid, row, col) {
  	var current = grid[row][col];
  	for (var r = 0; r < grid.length; r++) {
  		if (r != row) {
  			if (current == grid[r][col]) {
  				return false;
  			}
  		}
  	}
  	return true;
  }

  function checkSubgrid(grid, row, col) {
  	// subgrids are laid out like
    // [ 0,0 ][ 0,1 ][ 0,2 ]
  	// [ 1,0 ][ 1,1 ][ 1,2 ]
  	// [ 2,0 ][ 2,1 ][ 2,2 ]
  	var root = Math.sqrt(grid.length);
  	var subrow = Math.floor(row / root) * root;
  	var subcol = Math.floor(col / root) * root;
  	for (var r = subrow; r < subrow + root; r++) {
  		for (var c = subcol; c < subcol + root; c++) {
  			if (r != row || c != col) {
  				if (grid[r][c] == grid[row][col]) {
  					return false;
  				}
  			}
  		}
  	}
  	return true;
  }

  return checkValid(grid);
}

export default checkComplete;
