import React, { Component } from 'react';

// Components
import AlgoButtons from './AlgoButtons';
import IterationContainer from './IterationContainer';
import BottomButtons from './BottomButtons';

class ButtonContainer extends Component {
  render() {
    return (
      <div className="button-container">
        <AlgoButtons {...this.props} />
        <IterationContainer {...this.props} />
        <BottomButtons {...this.props} />
      </div>
    )
  }
}

export default ButtonContainer;
