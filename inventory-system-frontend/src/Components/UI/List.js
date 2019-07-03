import React from 'react';
import { Link } from 'react-router-dom';
import classes from './List.module.css';

import editIcon from '../../assets/edit-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';

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

function List ({ items, url, deleteItemHandler }) {
  console.log(items, 'items that were passed in by props');
  
  items = Array.from(items);
  items.sort(function (a, b) {
    return b.amount - a.amount;
  });

  items.sort(function (a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  console.log(items);

  let containerClass = null;
  if (url === '/items/update/') {
    containerClass = classes.items;
  } else {
    containerClass = classes.rooms;
  }

  let Items;
  if (items.length !== 0) {
    Items = items.map((item) => {
      if (item.hasOwnProperty('amount')) {
        let itemClasses = [classes['item__link']];
        let amountClasses = [classes['item__amount']];
        if (item.amount === 0) {
          itemClasses.push(classes['color--red']);
          amountClasses.push(classes['color--red']);
        }
        // ==========
        // ITEMS
        // ==========
        return (
          <div key={item._id} className={classes.item}>
            <p className={classes['item__name']}>
              <Link className={itemClasses.join(' ')} to={url + item._id}>
                {item.name}
              </Link>
            </p>

            <div className={classes.item__actions}>
              <img className={classes.item__icon} src={deleteIcon} onClick={() => { deleteItemHandler(item._id) }} alt='a trash can as a delete icon'/>
              <Link className={classes['item__link-icon']} to={url + item._id}>
                <img className={classes.item__icon} src={editIcon} alt='edit item icon' />
              </Link>
              <p className={amountClasses.join(' ')}>
                { item.amount }
              </p>
            </div>
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
