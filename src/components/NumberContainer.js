import React, { Component } from 'react';

import NumberButton from './NumberButton';

class NumberContainer extends Component {
  render() {
    var buttons = [];
    for (var i = 1; i <= 9; i++) {
       buttons.push(<NumberButton val={i} onClick={this.props.onClick} />);
    };
    buttons.push(<NumberButton val="X" onClick={this.props.onClick} />);

    return (
      <div className="number-container">
        {buttons}
      </div>
    )
  }
}

export default NumberContainer;
