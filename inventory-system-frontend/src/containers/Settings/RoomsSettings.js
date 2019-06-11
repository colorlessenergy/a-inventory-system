import React, { Component } from 'react';

import { connect } from 'react-redux';
import { initRoomsAction } from '../../redux/actions/roomsAction';
import RoomsList from '../../Components/UI/List';


class RoomsSettings extends Component {
  componentDidMount () {
    this.props.getRooms();
  }

  render () {
    return (
      <RoomsList url={'/room/'} items={this.props.rooms}></RoomsList>
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
    getRooms: () => {
      dispatch(initRoomsAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSettings)