import React from 'react'
import { Link } from 'react-router-dom'


const settings = () => {
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
};


export default settings;