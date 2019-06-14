import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Api from '../services/Api';

class Settings extends Component {
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.replace('/');
    }
  }

  /**
   * remove the jwt token from local storage and from the database
   * redirect to the home page
   */
  logOutHandler =  () => {
    Api().delete('/auth/token')
      .then(() => {
        localStorage.removeItem('token');
        this.props.logOutHandler();
        this.props.history.replace('/');
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <React.Fragment>
        <p>
          <Link to='/settings/user'>user settings</Link>
        </p>
        <p>
          <Link to='/settings/rooms'>room settings</Link>
        </p>
        <p onClick={this.logOutHandler}>
          log out
        </p>
      </React.Fragment>
    );
  }
}


export default Settings;