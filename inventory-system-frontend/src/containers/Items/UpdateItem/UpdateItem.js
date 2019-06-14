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
    id: this.props.match.params.id
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

  submitHandler = (ev) => {
    ev.preventDefault();
    console.log('about to send request to update item' , this.state);
    let itemData = {};
    // input check to add to request 
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
    console.log('sending request to PUT /items/:id');
    Api().put('/items/' + this.state.id, itemData)
      .then((res) => {
        console.log('PUT /items/:id res');
        console.log(res);
        this.props.history.goBack();
      })
      .catch((err) => {
        console.log('PUT /items/:id err');
        console.log(err);
        localStorage.removeItem('token');
        this.props.history.replace('/');
      });
  }

  deleteItemHandler = (ev) => {
    ev.preventDefault();
    console.log('about to send request to delete item');
    console.log(this.state);

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
        localStorage.removeItem('token');
        this.props.history.replace('/');
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
          <Link to={'/rooms/' + this.props.match.params.id}>
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
          />
      </React.Fragment>
    )
  }
}

export default UpdateItem;