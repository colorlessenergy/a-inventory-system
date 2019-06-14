import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';

import Nav from './Components/Nav/Nav';

import Home from './Components/Home/Home'

import Register from './containers/Register/Register';
import Login from './containers/Login/Login';

import Rooms from './containers/Rooms/Rooms';


import Items from './containers/Items/Items';
import AddItem from './containers/Items/AddItem';
import UpdateItem from './containers/Items/UpdateItem/UpdateItem';

import Settings from './Components/Settings';
import RoomsSettings from './containers/Settings/RoomsSettings';
import UserSettings from './containers/Settings/UserSettings';

import UpdateRoom from './containers/Rooms/UpdateRoom';


class App extends Component {
  state = {
    isLoggedIn: false
  }

  componentWillMount () {
    console.log('checking if theres a token when we enter the page');
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      });
    }
  }
  
  loginHandler = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  logOutHandler = () => {
    this.setState({
      isLoggedIn: false
    });
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Nav isLoggedIn={this.state.isLoggedIn} />
          <Route path='/' exact component={Home} />
          
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact render={(props) => <Login loginHandler={this.loginHandler} {...props} />} />
          
          <Route path='/rooms' exact component={Rooms} />
          <Route path='/rooms/update/:id' exact component={UpdateRoom} />
          <Route path='/rooms/:id' exact component={Items} />
          
          
          <Route path='/items/create/:id' exact component={AddItem} />
          <Route path='/items/update/:id' exact component={UpdateItem} />

          <Route path='/settings' exact render={ (props) => <Settings logOutHandler={this.logOutHandler} {...props} /> } />
          <Route path='/settings/rooms' exact component={RoomsSettings} />
          <Route path='/settings/user' exact component={UserSettings} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
