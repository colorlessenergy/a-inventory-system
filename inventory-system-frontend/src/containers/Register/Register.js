import React, { Component } from 'react';

import axios from '../../services/Api';
import Form from '../../Components/UI/Form/Form';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    errorMessage: '',
    inputsClicked: []
  }

  inputChangeHandler = event => {
    console.log('input changed');
    this.setState({
      [event.target.id]: event.target.value
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

  formSubmitHandler = event => {
    event.preventDefault();

    // **reset the inputsClicked array since its a new submit
    if (this.state.inputsClicked) {
      this.setState({
        inputsClicked: ''
      });
    }

    console.log('submitted', this.state);
    // **form validation
    let errorMessage = null;
    if (this.state.username === '') {
      console.log('THIS SHUOLDVE RAN');
      errorMessage = 'Missing username'
      console.log(errorMessage)
    }
    if (this.state.email === '') {
      if (errorMessage) {
        errorMessage += ', email'
      }
      else {
        errorMessage = 'Missing email';
      }
    }
    if (this.state.password === '') {
      if (errorMessage) {
        errorMessage += ', and password';
      }
      else {
        errorMessage = 'Missing password';
      }
    }
    if (errorMessage) {
      console.log('errorMessage', errorMessage);
      this.errorHandler(errorMessage);
      return;
    }

    // **sending request, form validation passed
    axios().post('/users', this.state)
      .then(res => {
        console.log('axios submit res');
        console.log(res);

        this.props.history.push('/login');
      })
      .catch(err => {
        console.log('axios submit err');
        console.log(err);

        this.errorHandler(err.response.data);
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
        buttonText='Register'
        onClick={this.inputClickHandler}
        errorMessage={this.state.errorMessage}
        inputsClicked={this.state.inputsClicked} />
    );
  }
}

export default Register;