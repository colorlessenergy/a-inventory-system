import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Settings extends Component {
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.replace('/');
    }
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
      </React.Fragment>
    );
  }
}


export default Settings;