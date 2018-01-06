import React, { Component } from 'react';
import Grid from './Grid';

class GridContainer extends Component {
  render() {
    return (
      <div className='grid-container'>
        <Grid
          {...this.props}
        />
      </div>
    )
  }
}

export default GridContainer;
