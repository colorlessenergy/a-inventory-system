import React, { Component } from 'react';
import RoomsList from '../../Components/RoomsList';
import AddRoom from './addRoom';
import { connect } from 'react-redux';

class Rooms extends Component {
  render () {
    return (
      <div>
        <AddRoom />
        <RoomsList Rooms={this.props.Rooms} />
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    Rooms: state.rooms.rooms
  }
}

export default connect(mapStateToProps)(Rooms);