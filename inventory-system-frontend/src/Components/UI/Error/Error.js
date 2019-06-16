import React, { Component } from 'react'

import classes from './Error.module.css';

class Error extends Component {
  componentDidMount() {
    console.log(this.props.errorMessage);
  }

  render() {
    return (
      <div className={classes['error-container']}>
        <p className={classes['error__text']}>{this.props.errorMessage}</p>
      </div>
    );
  }
};

export default Error;