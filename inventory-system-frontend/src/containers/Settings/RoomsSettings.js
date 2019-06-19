import React, { Component } from 'react';

import { connect } from 'react-redux';
import { initRoomsAction } from '../../redux/actions/roomsAction';
import RoomsList from '../../Components/UI/List';


class RoomsSettings extends Component {
  componentWillMount() {
    console.log('componentWillMount in RoomsSettings');

    if (!localStorage.token) {
      console.log('no token in RoomsSettings');
      this.props.history.replace('/');
      return;
    }

    console.log('there is a token in RoomsSettings');
  }

  render () {
    return (
        <RoomsList url={'/rooms/update/'} items={this.props.rooms}></RoomsList>
      );
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