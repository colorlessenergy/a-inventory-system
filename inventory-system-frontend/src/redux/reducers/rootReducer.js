import { combineReducers } from 'redux';
import rooms from './roomsReducer';

export default combineReducers({
  rooms: rooms
});