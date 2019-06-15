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
    
    case 'DELETE_ITEM':
      console.log('DELETE_ITEM', action);

      let newItems = state.items.items.filter((item) => {
        return item._id !== action.itemId;
      });

      return {
        ...state,
        items: {
          ...state.items,
          items: newItems
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