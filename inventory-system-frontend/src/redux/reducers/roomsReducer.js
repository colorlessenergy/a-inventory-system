const initState = {
  rooms: []
};

const roomsReducer = (state=initState, action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      console.log('adding room');
      let newRooms = [...state.rooms, action.room];

      return {
        ...state,
        rooms: newRooms
      };

    case 'INIT_ROOM':
      console.log('setting up the initial rooms', action);
      let rooms = action.rooms.slice();

      return {
        ...state,
        rooms: rooms
      };

      default:
        console.log('action does not exist');
        return state;
  };
};

export default roomsReducer;