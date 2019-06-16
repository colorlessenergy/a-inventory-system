import React, {Component} from 'react';

import axios from '../../services/Api';
import Form from '../../Components/UI/Form/Form';

class Login extends Component {
  state = {
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
    if (this.state.email === '') {
      errorMessage = 'Missing email';
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
    axios().post('/auth/token', this.state)
      .then(res => {
        console.log('axios login res received', res);

        localStorage.setItem('token', res.data.token);
        console.log('localStorage token', localStorage.getItem('token'));
        console.log(this.props);
        this.props.loginHandler();
        
        this.props.history.push('/rooms');
      })
      .catch(err => {
        console.log('axios login error receieved', err.response);
        console.log(err.response.data);
        
        this.errorHandler(err.response.data);
      });
  }

  render () {
    let inputsData = [
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
        formTitle='Login'
        inputsData={inputsData}
        onChange={this.inputChangeHandler}
        onSubmit={this.formSubmitHandler}
        buttonText='Login'
        onClick={this.inputClickHandler}
        errorMessage={this.state.errorMessage}
        inputsClicked={this.state.inputsClicked} />
    );
  }
}

export default Login;