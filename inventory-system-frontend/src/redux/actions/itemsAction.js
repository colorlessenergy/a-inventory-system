import Api from '../../services/Api';

export const addItemAction = (item) => {
  return (dispatch, getState) => {
    console.log('addItemAction');
    console.log('item', item);

    // adding single item
    dispatch({ type: 'ADD_ITEM', item: item })
  }
}

export const initItemsAction = (roomId) => {
  return (dispatch, getState) => {
    console.log('in initItemsAction');
    console.log('roomId', roomId);
    const axiosConfig = {
      headers: {
        'id': roomId
      }
    };
    Api().get('/rooms/items', axiosConfig)
      .then((res) => {
        console.log('GET /rooms/items res');
        console.log(res);
        // expecting the items in redux to be empty on first check
        dispatch({ type: 'INIT_ITEMS', items: res.data });
      })
      .catch((err) => {
        console.log('GET /rooms/items err')
        console.log(err);
      })
  };
};
