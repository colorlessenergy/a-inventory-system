import Api from '../../services/Api';

export const addRoomAction = (room) => {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_ROOM', room });
  };
};

export const initRoomsAction = () => {
  return (dispatch, getState) => {
    Api().get('/users/rooms')
      .then((res) => {
        console.log(res);
        // expecting the rooms in redux to be empty on first login
        dispatch({ type: 'INIT_ROOM', rooms: res.data });
      });
  };
};