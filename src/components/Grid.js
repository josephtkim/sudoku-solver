import React, { Component } from 'react';
import SquareNumToRowCol from '../scripts/SquareNumToRowCol';

class Grid extends Component {
  render() {
    var { currentGrid, currentSquare, algorithm, violationGrid, clueGrid } = this.props.info;
    var selectSquare = this.props.selectSquare;

    var grid = [];

    // Currently selected square
    var sRow = currentSquare[0];
    var sCol = currentSquare[1];
    var isCurrent = false;

    for (var i = 1; i <= 81; i += 9) {
      var currentRow = [];
      for (var j = i; j < i + 9; j++) {
        var coordinates = SquareNumToRowCol(j);
        var row = coordinates[0];
        var col = coordinates[1];

        if (sRow === row && sCol === col) {
          isCurrent = true;
        } else {
          isCurrent = false;
        }

        var isViolation = violationGrid[row-1][col-1] === "X";
        var className = 'square';

        if (isViolation) {
          className += ' violation-square';
        }
        if (clueGrid[row-1][col-1] === "C" && !isViolation) {
          className += ' clue'
        }
        if (isCurrent) {
          className += ' active';
        }

        currentRow.push(
          <Square
            className={className}
            id={j}
            key={j}
            val={currentGrid[row-1][col-1]}
            onClick={selectSquare}>
          </Square>
        );
      }
      grid.push(currentRow);
    }

    var sudokuGrid = grid.map((row) => <tr>{row}</tr> );

    return (
      <div className="grid">
        <table cellpadding="0" cellspacing="0">
          <tbody>
            {sudokuGrid}
          </tbody>
        </table>
      </div>
    )
  }
}

function Square(props) {
  return (
    <td class="square"
      className={props.className}
      id={props.id}
      onClick={() => props.onClick(props.id)}
    >
      <div class="square-wrapper">
        <div class="square-value">{props.val === 0 ? '' : props.val}</div>
      </div>
    </td>
  )
}

export default Grid;
