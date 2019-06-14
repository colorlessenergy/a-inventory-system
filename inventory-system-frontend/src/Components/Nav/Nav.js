import React from 'react';

import { Link } from 'react-router-dom';

import classes from './nav.module.css'

const Nav = (props) => { 
  let nav = null;

  if (props.isLoggedIn) {
    nav = (
      <div className={classes.nav}>
        <Link className={classes.nav__link} to="/rooms">rooms</Link>
        <Link className={classes['nav__link--logo']} to='/'>
          <div className={classes.nav__logo}>
            ack
          </div>
        </Link>
        <Link className={classes.nav__link} to="/settings">settings</Link>
      </div>
    );
  } else {
    nav = (
      <div className={classes.nav}>
        <Link className={classes.nav__link} to="/login">Login</Link>
        <Link className={classes['nav__link--logo']} to='/'>
          <div className={classes.nav__logo}>
            ack
          </div>
        </Link>
        <Link className={classes.nav__link} to="/register">Register</Link>
      </div>
    )
  }

  return nav;
}

export default Nav;