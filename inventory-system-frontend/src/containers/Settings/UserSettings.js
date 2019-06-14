import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from '../../Components/UI/Form/Form';
import classes from '../Items/AddItem.module.css';

import Api from '../../services/Api';


class UserSettings extends Component {
  state = {
    username: '',
    email: '',
    hash: ''
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

  submitHandler = (ev) => {
    ev.preventDefault();

    let roomData = {};
    if (this.state.username !== '') {
      roomData.username = this.state.username;
    }

    if (this.state.email !== '') {
      roomData.email = this.state.email;
    }

    if (this.state.hash !== '') {
      roomData.hash = this.state.hash;
    }
    
    Api().put('/users', roomData)
      .then((res) => {
        console.log(res);
        this.props.history.push('/settings');
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem('token');
        this.props.history.replace('/');
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
          buttonText='Update User Settings'></Form>
      </React.Fragment>
    )
  }
}

export default UserSettings;