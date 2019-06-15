const initState = {
  items: {}
};

const itemsReducer = (state=initState, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      console.log('ADD_ITEM', action);
      return {
        ...state,
        items: {
          ...state.items,
          items: [...state.items.items, action.item]
        }
      }

    case 'INIT_ITEMS':
      console.log('INIT_ITEMS', action);
      let items = JSON.parse(JSON.stringify(action.items));
      console.log('items', items);
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