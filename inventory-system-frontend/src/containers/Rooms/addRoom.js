import React, { Component } from 'react';
import { addRoomAction } from '../../redux/actions/roomsAction'
import { connect } from 'react-redux'

class addRoom extends Component {

  state = {
    id: Math.random(),
    roomName: null
  }

  createRoom = (ev) => {
    ev.preventDefault();

    this.props.createRoom(this.state);
  }

  inputChangeHandler = (ev) => {
    this.setState({
      roomName: ev.target.value
    });

  }

  render() {
    return (
      <form onSubmit={this.createRoom}>
        <label htmlFor="roomName">
          <input onChange={this.inputChangeHandler} type="text" name="roomName" id="roomName"/>
        </label>
        <button>add</button>
      </form>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (room) => {
      dispatch(addRoomAction(room));
    }
  }
}

export default connect(null, mapDispatchToProps)(addRoom)