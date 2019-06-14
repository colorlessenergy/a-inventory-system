import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoomsList from '../../Components/UI/List';
import AddRoom from './AddRoom';
import { initRoomsAction } from '../../redux/actions/roomsAction';

class Rooms extends Component {
  componentDidMount() {
    console.log('rooms mounted ', this.props.rooms);
    console.log(this.props);
    if (!localStorage.token) {
      this.props.history.replace('/');
      return;
    }
    this.props.getRooms(this.props.history);
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
    getRooms: (history) => {
      dispatch(initRoomsAction(history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);