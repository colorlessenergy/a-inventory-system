import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Home.module.css'

const Home = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h2 className={classes.header__title}>
          The painless way of tracking your inventory
        </h2>
        <p className={classes.header__description}>
          ack is the best platform for tracking your inventory online. ack has an intuitive user interface and has the ability to access your inventory from anywhere in the world.
        </p>

        <p className={classes.link}>
          <Link className={classes.link__text} to={'/register'}>
            Start Now
        </Link>
        </p>
      </header>
      <section className={classes.section}>
        <h2 className={classes.section__title}>
          The complete toolkit for managing inventory  
        </h2>
        <p className={classes.section__description}>
          ack provides the best tool to manage your inventory. ack intuitive design allows you to track your inventory with ease.
        </p> 
      </section>
      <footer className={classes.footer}>
        <p>
          Developers
        </p>

        <p>
          <a className={classes.footer__link} href="https://colorlessenergy.github.io/">Brian Munoz</a>
        </p>
        <p>
          <a className={classes.footer__link} href="https://planeswalker1.github.io/">Daniel Munoz</a>
        </p>
      </footer>
    </React.Fragment>
  )
}

export default Home;