import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import Form from '../../../Components/UI/Form/Form';
import classes from '../../Items/AddItem.module.css';

class UpdateItem extends Component {
  // this is the data needed to update a item in our API
  state = {
    name: '',
    amount: '',
    id: this.props.match.params.id
  }

  inputChangeHandler = (ev) => {
    console.log('input onChange called');
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }

  submitHandler = (ev) => {
    ev.preventDefault();
    // TODO send request to update item in db
    console.log('about to send request to update item' , this.state);
  }

  render() {
    let inputsData = [
      {
        key: 'input-name',
        for: 'name',
        labelText: 'name',
        type: 'text'
      },
      {
        key: 'input-amount',
        for: 'amount',
        labelText: 'amount',
        type: 'text'
      }
    ];
    return (
      <React.Fragment>
        <p className={classes["link-container"]}>
          <Link to={'/rooms/' + this.props.match.params.id}>
            go back to items
          </Link>
        </p>
        <Form
          formTitle='Update Input'
          inputsData={inputsData}
          onChange={this.inputChangeHandler}
          onSubmit={this.submitHandler}
          buttonText='Update Item' />
      </React.Fragment>
    )
  }
}

export default UpdateItem;