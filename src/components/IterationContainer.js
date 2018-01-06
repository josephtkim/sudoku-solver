import React, { Component } from 'react';

class IterationContainer extends Component {
  render() {
    return (
      <div className="iteration-container">
        <div className="iteration-display">
          <div class="iteration-title">Iterations:</div>
          <div class="iteration-count">{this.props.iterations}</div>
        </div>
      </div>
    )
  }
}

export default IterationContainer;
