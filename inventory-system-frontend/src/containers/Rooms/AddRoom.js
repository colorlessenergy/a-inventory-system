import React, { Component } from 'react';
import { addRoomAction } from '../../redux/actions/roomsAction';
import { connect } from 'react-redux';

import classes from './AddRoom.module.css';
import Api from '../../services/Api';

class AddRoom extends Component {
  state = {
    name: ''
  }

  componentWillMount() {
    console.log('componentWillMount in AddRoom');

    if (!localStorage.token) {
      console.log('no token in AddRoom');
      this.props.history.replace('/');
      return;
    }

    console.log('there is a token in AddRoom');
  }

  createRoom = (ev) => {
    ev.preventDefault();

    console.log('check if form is filled out before sending request');
    // **form validation
    if (this.state.name === '') {
      this.props.errorHandler('Missing room name');
      return;
    }

    console.log('sending request to POST "/rooms"');
    // **sending request, form validation passed
    Api().post('/rooms', { name: this.state.name })
      .then((res) => {
        console.log('res POST "/rooms"');
        console.log(res.data);
        this.props.createRoom(res.data);

        this.setState({
          name: ''
        });
      })
      .catch((err) => {
        console.log('err POST "/rooms"');
        console.log(err.response.data);

        this.props.errorHandler(err.response.data);
      });
  }

  inputChangeHandler = (ev) => {
    this.setState({
      name: ev.target.value
    });
  }

  render() {
    let input = null;
    if (this.props.errorMessage) {
      input = (
        <label htmlFor="roomName" className={[classes['form__label--inline'], classes['form__label--inline-error']].join(' ')}>
          <input
            id="roomName"
            type="text"
            name="roomName"
            className={[classes['form__input--inline'], classes['form__input--inline-error']].join(' ')}
            onChange={this.inputChangeHandler}
            value={this.state.name}
            onClick={this.props.onClick} />
        </label>
      );
    }
    else {
      input = (
        <label htmlFor="roomName" className={classes['form__label--inline']}>
          <input
            id="roomName"
            type="text"
            name="roomName"
            className={classes['form__input--inline']}
            onChange={this.inputChangeHandler}
            value={this.state.name} />
        </label>
      );
    }

    return (
      <form className={classes['form--inline']} onSubmit={this.createRoom}>
        <div className={classes['form__group--inline']}>
            {input}
          <button className={classes['form__button--inline']}>add</button>
        </div>
      </form>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (room) => {
      dispatch(addRoomAction(room));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddRoom);
