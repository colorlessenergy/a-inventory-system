import { combineReducers } from 'redux';
import rooms from './roomsReducer';
import items from './itemsReducer';

export default combineReducers({
  rooms: rooms,
  items: items,
});