import React, { Component } from 'react';
import RoomsList from '../../Components/RoomsList'

class Rooms extends Component {
    // Data that is expected to come from the API
    state = {
        Rooms: [
            { id: 0, name: 'Bread' },
            { id: 1, name: 'Candy' },
            { id: 2, name: 'Toys' },
        ]
    }

    render () {
        return (
            <RoomsList Rooms={this.state.Rooms} />
        )
    }
}

export default Rooms;