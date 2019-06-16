import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import Api from '../../../services/Api';

import Form from '../../../Components/UI/Form/Form';
import classes from '../../Items/AddItem.module.css';

class UpdateItem extends Component {
  // this is the data needed to update a item in our API
  state = {
    name: '',
    amount: '',
    id: this.props.match.params.id,
    errorMessage: '',
    inputsClicked: []
  }

  componentDidMount() {
    console.log('this props in UpdateItem');
    console.log(this.props);
    if (!localStorage.token) {
      this.props.history.replace('/');
    }
  }

  inputChangeHandler = (ev) => {
    console.log('input onChange called');
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }

  inputClickHandler = (ev) => {
    console.log('input clicked');
    console.log(ev.target.id);
    this.setState({
      inputsClicked: [...this.state.inputsClicked, ev.target.id]
    });
  }

  errorHandler = (errorMessage) => {
    this.setState({
      errorMessage: errorMessage
    });
  }

  submitHandler = (ev) => {
    ev.preventDefault();
    
    // reset the inputsClicked array since its a new submit
    if (this.state.inputsClicked) {
      this.setState({
        inputsClicked: ''
      });
    }

    console.log('about to send request to update item' , this.state);
    // **add filled out form inputs to object for item update
    let itemData = {};
    // **input check to add to request 
    if (this.state.name !== '') {
      itemData.name = this.state.name
    }
    if (this.state.amount !== '') {
      itemData.amount = this.state.amount
    }
    console.log('itemData in UpdateItem Form');
    console.log(itemData);
    console.log('this.state in UpdateItem');
    console.log(this.state);

    // ** check if user filled out inputs and redirect if none are
    console.log(itemData);
    console.log(Object.keys(itemData).length);
    if (Object.keys(itemData).length === 0) {
      console.log('no inputs filled out return to items');
      this.props.history.goBack();
      return;
    }

    // **sending request
    console.log('sending request to PUT /items/:id');
    Api().put('/items/' + this.state.id, itemData)
      .then((res) => {
        console.log('PUT /items/:id res');
        console.log(res);

        this.props.history.goBack();
      })
      .catch((err) => {
        console.log('PUT /items/:id err');
        console.log(err.response);
        
        this.errorHandler(err.response.data);
      });
  }

  deleteItemHandler = (ev) => {
    ev.preventDefault();
    console.log('about to send request to delete item');
    console.log(this.state);

    // **sending request
    console.log('sending request to DELETE /items/:id');
    Api().delete('/items/' + this.state.id)
      .then((res) => {
        console.log('DELETE /items/:id res');
        console.log(res);

        this.props.history.goBack();
      })
      .catch((err) => {
        console.log('DELETE /items/:id err');
        console.log(err);

        this.errorHandler(err.response.data);
      });
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
          <Link to='#' onClick={() => {
            this.props.history.goBack();
          }}>
            go back to items
          </Link>
        </p>
        <Form
          formTitle='Update Item'
          inputsData={inputsData}
          onChange={this.inputChangeHandler}
          buttonText='Update Item'
          onSubmit={this.submitHandler}
          deleteButtonText='Delete Item'
          deleteHandler={this.deleteItemHandler}
          errorMessage={this.state.errorMessage}
          inputsClicked={this.state.inputsClicked}
          onClick={this.inputClickHandler} />
      </React.Fragment>
    )
  }
}

export default UpdateItem;