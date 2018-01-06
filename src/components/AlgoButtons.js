import React, { Component } from 'react';

class AlgoButtons extends Component {
  render() {
    let currentAlgo = this.props.algorithm;
    let BFClass = 'algo-button button bruteforce';
    let DLXClass = 'algo-button button dlx';

    if (currentAlgo === "BF") {
      BFClass += ' current-algo';
    }
    else {
      DLXClass += ' current-algo';
    }

    return (
      <div className="algorithm-buttons">
        <div className="BF-container">
          <button
            className={BFClass}
            id="BF"
            onClick={this.props.pressBruteForce}>
            Brute Force
          </button>
        </div>

        <div className="DLX-container">
          <button
            className={DLXClass}
            id="DLX"
            onClick={this.props.pressDLX}>
            Dancing Links
          </button>
        </div>
      </div>
    )
  }
}

export default AlgoButtons;
