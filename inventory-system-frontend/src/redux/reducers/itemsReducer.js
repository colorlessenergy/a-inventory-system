const initState = {
  items: [
    { _id: '123', name: 'spike bombs', amount: '200' },
    { _id: '456', name: 'dirt blocks', amount: '150' },
    { _id: '789', name: 'wls', amount: '100' }
  ]
};

const itemsReducer = (state=initState, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      let newItems = [...state.items, action.item]
      return {
        ...state,
        items: newItems
      }

    case 'INIT_ITEMS':
      console.log('INIT_ITEMS', action);
      let items = action.items.slice();
      return {
        ...state,
        items: items
      };
    default:
      console.log('action does not exist');
      return state;
  };
};

export default itemsReducer;