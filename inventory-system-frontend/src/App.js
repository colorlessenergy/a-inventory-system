import React, {Component} from 'react';
import {Route, HashRouter, Link} from 'react-router-dom';

import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Rooms from './containers/Rooms/Rooms';
import Items from './containers/Items/Items';

class App extends Component {
  render () {
    return (
      <HashRouter>
        <div>
          <p>hello</p>
          <Link to="/login">Login</Link>
          <Link to="/register">register</Link>
          <Link to="/rooms">rooms</Link>
          <Route path='/login' exact component={Login} />
          <Route path='/rooms/:id' exact component={Items} />
          <Route path='/rooms' exact component={Rooms} />
          <Route path='/register' exact component={Register} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
