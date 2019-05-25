import React, {Component} from 'react';
import {Route, HashRouter, Link} from 'react-router-dom';

import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

class App extends Component {
  render () {
    return (
      <HashRouter>
        <div>
          <p>hello</p>
          <Link to="/login">Login</Link>
          <Link to="/register">register</Link>
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
