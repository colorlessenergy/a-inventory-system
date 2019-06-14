import Api from '../../services/Api';

export const addRoomAction = (room) => {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_ROOM', room });
  };
};

export const initRoomsAction = (history) => {
  return (dispatch, getState) => {
    Api().get('/users/rooms')
      .then((res) => {
        console.log('GET /items/:id res');
        console.log(res);
        // expecting the rooms in redux to be empty on first login
        dispatch({ type: 'INIT_ROOM', rooms: res.data });
      })
      .catch((err) => {
        console.log('GET /items/:id err');
        console.log(err);
        localStorage.removeItem('token');
        history.replace('/');
      });
  };
};