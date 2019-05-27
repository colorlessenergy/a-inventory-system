import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoomsList from '../../Components/RoomsList/RoomsList';
import AddRoom from './addRoom';
import { initRoomsAction } from '../../redux/actions/roomsAction';

class Rooms extends Component {
  componentDidMount() {
    console.log('rooms mounted');
    this.props.getRooms();
  }

  render () {
    return (
      <div>
        <AddRoom />
        <RoomsList rooms={this.props.rooms} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.rooms
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRooms: () => {
      dispatch(initRoomsAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);