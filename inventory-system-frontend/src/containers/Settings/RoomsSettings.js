import React, { Component } from 'react';

import { connect } from 'react-redux';
import { initRoomsAction } from '../../redux/actions/roomsAction';
import RoomsList from '../../Components/UI/List';


class RoomsSettings extends Component {
  componentDidMount () {
    if (!localStorage.token) {
      this.props.history.replace('/');
      return;
    }
    this.props.getRooms(this.props.history);
  }

  render () {
    return (
      <RoomsList url={'/rooms/update/'} items={this.props.rooms}></RoomsList>
      )
    }
}

const mapStateToProps = (state) => {
  console.log('mapping state ', state)
  return {
    rooms: state.rooms.rooms
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRooms: (history) => {
      dispatch(initRoomsAction(history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSettings)