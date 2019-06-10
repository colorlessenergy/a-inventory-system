import React from 'react'
import { Link } from 'react-router-dom'


const settings = () => {
  return (
    <React.Fragment>
      <p>
        <Link to='/user/settings'>user settings</Link>
      </p>
      <p>
        <Link to='/room/settings'>room settings</Link>
      </p>
    </React.Fragment>
  );
};


export default settings;