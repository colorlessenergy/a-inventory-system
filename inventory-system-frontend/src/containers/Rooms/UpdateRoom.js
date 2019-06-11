import React, { Component } from 'react';
import Form from '../../Components/UI/Form/Form'

import Api from '../../services/Api';

class UpdateRoom extends Component {
  state = {
    name: '',
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
    ]
    return (
      <Form
        formTitle="Update Room"
        inputsData={inputsData}
        onChange={this.inputChangeHandler}
        onSubmit={this.submitHandler}
        buttonText='Update Room'>
      </Form>
    )
  }
}

export default UpdateRoom;