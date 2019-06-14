import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../../Components/UI/Form/Form';

import Api from '../../services/Api';

import classes from '../Items/AddItem.module.css';


class UpdateRoom extends Component {
  state = {
    name: '',
  }
  componentDidMount() {
    if (!localStorage.token) {
      console.log('no token in GET /rooms/update/:id');
      this.props.history.replace('/');
      return;
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
    
    let roomData = {};
    if (this.state.name !== '') {
      roomData.name = this.state.name;
    }
    
    Api().put('/rooms/' + this.props.match.params.id, roomData)
      .then((res) => {
        console.log(res);
        this.props.history.push('/settings/rooms');
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('token');
        this.props.history.replace('/');
      });
    
  }

  deleteRoomHandler = (ev) => {
    ev.preventDefault();
    console.log('about to send request to delete room');
    console.log('room id', this.props.match.params.id);

    console.log('sending request to DELETE /rooms/:id');
    Api().delete('/rooms/' + this.props.match.params.id)
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

  render () {
    let inputsData = [
      {
        key: 'input-name',
        for: 'name',
        labelText: 'name',
        type: 'text'
      }
    ];

    return (
      <React.Fragment>
        <p className={classes["link-container"]}>
          <Link to='/settings/rooms'>
            go back to rooms
          </Link>
        </p>
        <Form
          formTitle="Update Room"
          inputsData={inputsData}
          onChange={this.inputChangeHandler}
          onSubmit={this.submitHandler}
          buttonText='Update Room'
          deleteButtonText='Delete Room'
          deleteHandler={this.deleteRoomHandler} />
      </React.Fragment>
    )
  }
}

export default UpdateRoom;