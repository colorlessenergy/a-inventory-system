import React, { Component } from 'react';
import { addRoomAction } from '../../redux/actions/roomsAction'
import { connect } from 'react-redux'
import Api from '../../services/Api';

class addRoom extends Component {

  state = {
    id: Math.random(),
    roomName: null
  }

  createRoom = (ev) => {
    ev.preventDefault();

    Api().post('/rooms', { name: this.state.roomName })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
      
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