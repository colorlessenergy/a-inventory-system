import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../../Components/UI/Form/Form';

import Api from '../../services/Api';

import classes from '../Items/AddItem.module.css';

class UpdateRoom extends Component {
  state = {
    name: '',
    errorMessage: '',
    inputsClicked: []
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

    // **add filled out form inputs to object for item update
    let roomData = {};
    if (this.state.name !== '') {
      roomData.name = this.state.name;
    }

    // **check if user filled out inputs and redirect if none are
    console.log(roomData);
    console.log(Object.keys(roomData).length);
    if (Object.keys(roomData).length === 0) {
      console.log('no inputs filled out return to room settings');
      this.props.history.push('/settings/rooms');
      return;
    }

    // **sending request
    Api().put('/rooms/' + this.props.match.params.id, roomData)
      .then((res) => {
        console.log('PUT /rooms/:id res');
        console.log(res.data);

        this.props.history.push('/settings/rooms');
      })
      .catch((err) => {
        console.log('PUT /rooms/:id err');
        console.log(err.response);

        this.errorHandler(err.response.data);
      });
    
  }

  deleteRoomHandler = (ev) => {
    ev.preventDefault();
    console.log('about to send request to delete room');
    console.log('room id', this.props.match.params.id);

    // **sending request
    console.log('sending request to DELETE /rooms/:id');
    Api().delete('/rooms/' + this.props.match.params.id)
      .then((res) => {
        console.log('DELETE /items/:id res');
        console.log(res);

        this.props.history.goBack();
      })
      .catch((err) => {
        console.log('DELETE /items/:id err');
        console.log(err.response);

        this.errorHandler(err.response.data);
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
          buttonText='Update'
          deleteButtonText='Delete'
          deleteHandler={this.deleteRoomHandler}
          errorMessage={this.state.errorMessage}
          inputsClicked={this.state.inputsClicked}
          onClick={this.inputClickHandler}
          />
      </React.Fragment>
    )
  }
}

export default UpdateRoom;