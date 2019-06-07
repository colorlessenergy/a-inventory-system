import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoomsList from '../../Components/UI/List';
import AddRoom from './AddRoom';
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
        <RoomsList url={'/rooms/'} items={this.props.rooms} />
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