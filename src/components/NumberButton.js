import React, { Component } from 'react';

class NumberButton extends Component {
  render() {
    return (
      <div
        className="number-button"
        id={this.props.val}
        onClick={this.props.onClick}
      >
        {this.props.val}
      </div>
    );
  }
}

export default NumberButton;
