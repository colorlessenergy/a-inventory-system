import React, {Component} from 'react';

import axios from '../../services/Api';
import Form from '../../Components/UI/Form/Form';

class Login extends Component {
  state = {
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

    axios().post('/auth/token', this.state)
      .then(res => {
        console.log('axios login res received', res);
        localStorage.setItem('token', res.data.token);
        console.log('localStorage token', localStorage.getItem('token'));
        console.log(this.props);
      })
      .catch(err => {
        console.log('axios login error receieved', err);
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
      />
    );
  }
}

export default Login;