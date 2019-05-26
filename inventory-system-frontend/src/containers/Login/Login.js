import React, {Component} from 'react';

import axios from '../../services/Api';

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
    return (
      <form className='form' onSubmit={this.formSubmitHandler}>
        <h1>Login</h1>
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" type="email" onChange={this.inputChangeHandler} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" onChange={this.inputChangeHandler} />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }
}

export default Login;