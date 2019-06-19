import React, { Component } from 'react';
import { connect } from 'react-redux';

import RoomsList from '../../Components/UI/List';
import AddRoom from './AddRoom';
import { initRoomsAction } from '../../redux/actions/roomsAction';
import Error from '../../Components/UI/Error/Error'

class Rooms extends Component {
  state = {
    errorMessage: ''
  }

  componentWillMount () {
    console.log('componentWillMount in Rooms');

    if (!localStorage.token) {
      console.log('no token in Rooms');
      this.props.history.replace('/');
      return;
    }

    console.log('there is a token in Rooms');
  }

  componentDidMount() {
    console.log('Rooms mounted ', this.props.rooms);
    console.log(this.props);
    this.props.getRooms(this.props.history);
  }

  errorHandler = (errorMessage) => {
    this.setState({
      errorMessage: errorMessage
    });
  }

  inputClickHandler = () => {
    this.setState({
      errorMessage: ''
    });
  }

  render () {
    let error = null;
    console.log(this.state.errorMessage);
    if (this.state.errorMessage) {
      error = <Error errorMessage={this.state.errorMessage} />;
    }

    return (
      <div>
        {error}
        <AddRoom
          onClick={this.inputClickHandler}
          errorMessage={this.state.errorMessage}
          errorHandler={this.errorHandler} />
        <RoomsList
          url={'/rooms/'}
          items={this.props.rooms} />
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