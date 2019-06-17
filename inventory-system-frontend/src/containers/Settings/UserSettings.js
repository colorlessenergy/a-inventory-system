import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from '../../Components/UI/Form/Form';
import classes from '../Items/AddItem.module.css';

import Api from '../../services/Api';


class UserSettings extends Component {
  state = {
    username: '',
    email: '',
    hash: '',
    errorMessage: '',
    inputsClicked: []
  }
  
  componentDidMount() {
    if (!localStorage.token) {
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
    
    // **reset the inputsClicked array since its a new submit
    if (this.state.inputsClicked) {
      this.setState({
        inputsClicked: ''
      });
    }

    // **add filled out form inputs to object for user info update
    let userData = {};
    if (this.state.username !== '') {
      userData.username = this.state.username;
    }

    if (this.state.email !== '') {
      userData.email = this.state.email;
    }

    if (this.state.hash !== '') {
      userData.hash = this.state.hash;
    }

    // **check if user filled out inputs and redirect if none are
    console.log(userData);
    console.log(Object.keys(userData).length);
    if (Object.keys(userData).length === 0) {
      console.log('no inputs filled out return to user settings');
      this.props.history.push('/settings');
      return;
    }

    // **sending request
    Api().put('/users', userData)
      .then((res) => {
        console.log('PUT /users res');
        console.log(res);

        this.props.history.push('/settings');
      })
      .catch((err) => {
        console.log('PUT /users err');
        console.error(err.response);
        
        this.errorHandler(err.response.data);
      })
    
  }

  render() {
    let inputsData = [
      {
        key: 'input-username',
        for: 'username',
        labelText: 'username',
        type: 'text'
      },
      {
        key: 'input-email',
        for: 'email',
        labelText: 'email',
        type: 'text'
      },
      {
        key: 'input-hash',
        for: 'hash',
        labelText: 'password',
        type: 'password'
      }
    ]

    return (
      <React.Fragment>
        <p className={classes["link-container"]}>
          <Link to='/settings'>
            go back to user settings
          </Link>
        </p>
        <Form
          formTitle="Update User Settings"
          inputsData={inputsData}
          onChange={this.inputChangeHandler}
          onSubmit={this.submitHandler}
          buttonText='Update'
          errorMessage={this.state.errorMessage}
          inputsClicked={this.state.inputsClicked}
          onClick={this.inputClickHandler} />
      </React.Fragment>
    )
  }
}

export default UserSettings;