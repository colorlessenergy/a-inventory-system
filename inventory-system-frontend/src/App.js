import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
