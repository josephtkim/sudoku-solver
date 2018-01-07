import React, { Component } from 'react';

// Scripts
import runDLX from '../scripts/runDLX';
import runBF from '../scripts/runBF';
import checkComplete from '../scripts/checkComplete';
import checkViolation from '../scripts/checkViolation';
import SquareNumToRowCol from '../scripts/SquareNumToRowCol';
import getGridCopy from '../scripts/getGridCopy';

// Components
import Title from './Title';
import ButtonContainer from './ButtonContainer';
import MainContainer from './MainContainer';
import Grid from './Grid';
import GridContainer from './GridContainer';
import NumberContainer from './NumberContainer';

const emptyGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// Components for the page structure
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGrid: emptyGrid,
      algorithm: 'BF',
      currentSquare: [1,1],
      iterations: 0,
      violationFlag: false,
      violationGrid: emptyGrid,
      clueGrid: emptyGrid
    }

    this.setBruteForce = this.setBruteForce.bind(this);
    this.setDLX = this.setDLX.bind(this);
    this.solve = this.solve.bind(this);
    this.clear = this.clear.bind(this);
    this.selectSquare = this.selectSquare.bind(this);
    this.keyBoardPress = this.keyBoardPress.bind(this);
    this.checkGridViolations = this.checkGridViolations.bind(this);
    this.clickNumber = this.clickNumber.bind(this);
  }

  checkGridViolations() { // Function to check and update grid for violations
    let gridCopy = getGridCopy(this.state.currentGrid);
    var currentViolation = checkViolation(gridCopy);
    var currentViolationCheck = currentViolation[0];
    var currentViolationGrid = currentViolation[1];

    this.setState({
        violationFlag: currentViolationCheck,
        violationGrid: currentViolationGrid
    })
  }

  setBruteForce() {
    this.setState({ algorithm: 'BF' })
  }

  setDLX() {
    this.setState({ algorithm: 'DLX' })
  }

  solve() {
    // Don't run if already solved
    if (checkComplete(this.state.currentGrid)) {
      return;
    } else if (this.state.violationFlag) {
      alert("Please fix all errors marked in red before running.");
      return;
    }

    let gridCopy = getGridCopy(this.state.currentGrid);

    // Create copy of current grid
    if (this.state.algorithm === 'DLX') {
      let solutionNamespace = runDLX(gridCopy);
      let solution = solutionNamespace.answerToSudoku;
      let iterationCount = solutionNamespace.steps;

      if (solutionNamespace.solutionFound) {
        this.setState({
          currentGrid: solution,
          iterations: iterationCount
        })
      } else {
        alert("Puzzle has no solution.");
        this.setState({
          iterations: iterationCount
        })
      }
    }
    else if (this.state.algorithm === 'BF') {
      let solutionNamespace = runBF(gridCopy);
      let solution = solutionNamespace.answerToSudoku;
      let iterationCount = solutionNamespace.steps;

      if (solutionNamespace.solutionFound) {
        this.setState({
          currentGrid: solution,
          iterations: iterationCount
        })
      } else {
        alert("Puzzle could not be solved in a reasonable number of iterations or has no solution. Please try to enter a new puzzle.");
        this.setState({
          iterations: iterationCount
        })
      }
    }
  }

  clear() {
    this.setState({
      currentGrid: emptyGrid,
      iterations: 0,
      violationFlag: false,
      violationGrid: emptyGrid,
      clueGrid: emptyGrid
    })
  }

  // Number pad
  clickNumber(e) {
    e.preventDefault();

    var currentCoordinates = this.state.currentSquare;
    var curRow = currentCoordinates[0];
    var curCol = currentCoordinates[1];
    var newVal;

    let gridCopy = getGridCopy(this.state.currentGrid);
    let clueGridCopy = getGridCopy(this.state.clueGrid);

    // Pressed number between 1-9
    if (parseInt(e.target.id) >= 1 && parseInt(e.target.id) <= 9) {
      newVal = parseInt(e.target.id);
      gridCopy[curRow-1][curCol-1] = newVal;
      clueGridCopy[curRow-1][curCol-1] = "C";
    }

    // Backspace or Delete
    if (e.target.id === "X") {
      gridCopy[curRow-1][curCol-1] = 0;
      clueGridCopy[curRow-1][curCol-1] = 0;
    }

    var violationInfo = checkViolation(gridCopy);
    var currentViolationFlag = violationInfo[0];
    var currentViolationGrid = violationInfo[1];

    this.setState({
      currentGrid: gridCopy,
      violationFlag: currentViolationFlag,
      violationGrid: currentViolationGrid,
      clueGrid: clueGridCopy
    })
  }

  keyBoardPress(e) {
    e.preventDefault();
    // Navigate through board using arrow keys
    var currentCoordinates = this.state.currentSquare;
    var curRow = currentCoordinates[0];
    var curCol = currentCoordinates[1];
    var newRow = curRow;
    var newCol = curCol;

    if (e.keyCode === 38) { // UP
      if (curRow === 1) {
        newRow = 9;
      } else {
        newRow = curRow - 1;
      }
    }
    if (e.keyCode === 40) { // DOWN
      if (curRow === 9) {
        newRow = 1;
      } else {
        newRow = curRow + 1;
      }
    }
    if (e.keyCode === 37) { // LEFT
      if (curCol === 1) {
        newCol = 9;
      } else {
        newCol = curCol - 1;
      }
    }
    if (e.keyCode === 39) { // RIGHT
      if (curCol === 9) {
        newCol = 1;
      } else {
        newCol = curCol + 1;
      }
    }

    var newVal;
    let gridCopy = getGridCopy(this.state.currentGrid);
    let clueGridCopy = getGridCopy(this.state.clueGrid);

    // Pressed number between 1-9
    if (e.keyCode >= 49 && e.keyCode <= 57) {
      newVal = e.keyCode - 48;
      gridCopy[newRow-1][newCol-1] = newVal;
      clueGridCopy[newRow-1][newCol-1] = "C";
    }

    // Backspace or Delete
    if (e.keyCode === 8 || e.keyCode === 46) {
      gridCopy[newRow-1][newCol-1] = 0;
      clueGridCopy[newRow-1][newCol-1] = 0;
    }

    var violationInfo = checkViolation(gridCopy);
    var currentViolationFlag = violationInfo[0];
    var currentViolationGrid = violationInfo[1];

    this.setState({
      currentGrid: gridCopy,
      currentSquare: [newRow, newCol],
      violationFlag: currentViolationFlag,
      violationGrid: currentViolationGrid,
      clueGrid: clueGridCopy
    })
  }

  selectSquare(squareNumber) {
    var coordinates = SquareNumToRowCol(squareNumber);
    var row = coordinates[0];
    var col = coordinates[1];

    this.setState({
      currentSquare: [row, col]
    })
  }

  render() {
    return (
      <div
        className="project-container"
        onKeyDown={this.keyBoardPress}
        tabIndex="0"
      >
        <Title />
        <MainContainer>
          <GridContainer
            info={this.state}
            selectSquare={this.selectSquare}
          />

          <ButtonContainer
            pressBruteForce={this.setBruteForce}
            pressDLX={this.setDLX}
            solve={this.solve}
            clear={this.clear}
            iterations={this.state.iterations}
            algorithm={this.state.algorithm}
          />
        </MainContainer>

        <NumberContainer onClick={this.clickNumber} />
      </div>
    )
  }
}

export default App;
