import React, { Component } from 'react';
import { addRoomAction } from '../../redux/actions/roomsAction';
import { connect } from 'react-redux';

import classes from './AddRoom.module.css';
import Api from '../../services/Api';

class AddRoom extends Component {
  state = {
    name: null
  }

  createRoom = (ev) => {
    ev.preventDefault();
    console.log('sending request to POST "/rooms"');
    Api().post('/rooms', { name: this.state.name })
      .then((res) => {
        console.log(res.data);
        this.props.createRoom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  inputChangeHandler = (ev) => {
    this.setState({
      name: ev.target.value
    });
  }

  render() {
    return (
      <form className={classes['form--inline']} onSubmit={this.createRoom}>
        <div className={classes['form__group--inline']}>
          <label htmlFor="roomName" className={classes['form__label--inline']}>
            <input
              id="roomName"
              type="text"
              name="roomName"
              className={classes['form__input--inline']}
              onChange={this.inputChangeHandler} />
          </label>
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
