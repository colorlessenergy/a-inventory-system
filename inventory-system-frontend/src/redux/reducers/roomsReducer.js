const initState = {
  rooms: []
}

const roomsReducer = (state=initState, action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      console.log('adding room')
      let newRooms = [...state.rooms, action.room];

      return {
        ...state,
        rooms: newRooms
      };

      default:
        console.log('action does not exist');
        return state;
  }
}

export default roomsReducer