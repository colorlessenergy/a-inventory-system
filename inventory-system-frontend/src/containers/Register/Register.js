import React, { Component } from 'react';

import axios from '../../services/Api';
import Form from '../../Components/UI/Form/Form';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  inputChangeHandler = event => {
    console.log('input changed');
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  formSubmitHandler = event => {
    event.preventDefault();
    console.log('submitted', this.state);

    axios().post('/users', this.state)
      .then(res => {
        console.log('axios submit res');
        console.log(res);
        this.props.history.push('/login');
      })
      .catch(err => {
        console.log('axios submit err');
        console.log(err);
      });
  }

  render() {
    let inputsData = [
      {
        key: 'input-username',
        for: 'username',
        labelText: 'Username: ',
        type: 'text'
      },
      {
        key: 'input-email',
        for: 'email',
        labelText: 'Email: ',
        type: 'email'
      },
      {
        key: 'input-password',
        for: 'password',
        labelText: 'Password: ',
        type: 'Password'
      }
    ];
    return (
      <Form
        formTitle='Register'
        inputsData={inputsData} 
        onChange={this.inputChangeHandler}
        onSubmit={this.formSubmitHandler}
        buttonText='Register' />
    );
  }
}

export default Register;