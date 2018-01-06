import React, { Component } from 'react';

class BottomButtons extends Component {
  render() {
    return (
      <div className="bottom-buttons">
        <button
          className="clear-button button"
          onClick={this.props.clear}>
          Clear
        </button>
        <button
          className="solve-button button"
          onClick={this.props.solve}>
          Solve
        </button>
      </div>
    )
  }
}

export default BottomButtons;
