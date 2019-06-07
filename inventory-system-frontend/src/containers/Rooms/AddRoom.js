import React, { Component } from 'react';
import { addRoomAction } from '../../redux/actions/roomsAction';
import { connect } from 'react-redux';

import Api from '../../services/Api';

class AddRoom extends Component {
  state = {
    name: null
  }

  createRoom = (ev) => {
    ev.preventDefault();

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
      <form onSubmit={this.createRoom}>
        <label htmlFor="roomName">
          <input onChange={this.inputChangeHandler} type="text" name="roomName" id="roomName" />
        </label>
        <button>add</button>
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
