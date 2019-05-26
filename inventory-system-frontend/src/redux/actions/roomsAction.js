export const addRoomAction = (room) => {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_ROOM', room });
  }
}