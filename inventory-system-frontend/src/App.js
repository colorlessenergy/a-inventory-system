import React, {Component} from 'react';
import {Route, HashRouter, Link} from 'react-router-dom';

import Register from './containers/Register/Register';
import Login from './containers/Login/Login';

import Rooms from './containers/Rooms/Rooms';


import Items from './containers/Items/Items';
import AddItem from './containers/Items/AddItem';
import UpdateItem from './containers/Items/UpdateItem/UpdateItem';

import Settings from './Components/Settings';
import RoomsSettings from './containers/Settings/RoomsSettings';
import UpdateRoom from './containers/Rooms/UpdateRoom';


class App extends Component {
  render () {
    return (
      <HashRouter>
        <div>
          <p>hello</p>
          <Link to="/login">Login</Link>
          <Link to="/register">register</Link>
          <Link to="/rooms">rooms</Link>
          <Link to="/settings">settings</Link>
          <Route path='/login' exact component={Login} />
          <Route path='/rooms/:id' exact component={Items} />
          <Route path='/rooms/update/:id' exact component={UpdateRoom} />
          <Route path='/items/create/:id' exact component={AddItem} />
          <Route path='/rooms' exact component={Rooms} />
          <Route path='/register' exact component={Register} />
          <Route path='/items/update/:id' exact component={UpdateItem} />
          <Route path='/settings' exact component={Settings} />
          <Route path='/settings/rooms' exact component={RoomsSettings} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
