import React from 'react';
import { Link } from 'react-router-dom';
import classes from './List.module.css';

/**
  takes in an array of data that is used to create
  JSX to display to the user
  
  @param {Array} items - an array of objects that is passed down by a container
    each property in the object 
    @param {String} items.name - a unique name for the item passed down by a container
    @param {String} items._id - a unique id of the item passed down by a container
    @param {String} items.amount - a unique amount for the item passed down by a container
    @param {String} url - a path to the item
 */

function List ({ items, url }) {
  console.log(items, 'items that were passed in by props');
  let containerClass = null;
  if (url === '/items/update/') {
    containerClass = classes.items;
  } else {
    containerClass = classes.rooms;
  }

  let Items;
  if (items.length !== 0) {
    Items = items.map((item) => {
      if (item.amount) {
        // ==========
        // ITEMS
        // ==========
        return (
          <div key={item._id} className={classes.item}>
            <p className={classes['item__name']}>
              <Link className={classes['item__link']} to={url + item._id}>
                {item.name}
              </Link>
            </p>
            <p className={classes['item__amount']}>
              { item.amount }
            </p>
          </div>
        );
      } 
      else {
        // ==========
        // ROOMS
        // ==========
        return (
          <div className={classes.room} key={item._id}>
            <p className={classes['room__text']}>
              <Link to={url + item._id} className={classes['room__link']}>
                {item.name}
              </Link>
            </p>
          </div>
        );
      }
    })
   } 
   else {
    // ==========
    // ITEMS
    // ==========
     if (url === '/items/update/') {
       return (
         <p className={classes['text']}>there are no items, create one!</p>
       );
     } 
     else {
      // ==========
      // ROOMS
      // ==========
       return (
         <p className={classes['text']}>there are no rooms, create one!</p>
       );
     }
   } 

  return (
    <div className={containerClass}>
      { Items }
    </div>
  );
};

export default List;
