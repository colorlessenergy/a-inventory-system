import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 
 * takes in an array of data that is used to create
 * JSX to display to the user
 * 
 * @param {Array} items - an array of objects that is passed down by a container
 *    each property in the object 
 *    @param {String} items.name - a unique name for the item passed down by a container
 *    @param {String} items._id - a unique id of the item passed down by a container
 *    @param {String} items.amount - a unique amount for the item passed down by a container
 * @param {String} url - a path to the item
 */

function List ({ items, url }) {
  console.log(items, 'items items that were passed in by props');

  let Items;
  if (items.length !== 0) { 
    Items = items.map((item) => {
      if (item.amount) {
        return (
          <div key={item._id}>
            <p>
              <Link to={url + item._id}>
                {item.name}
              </Link>
            </p>
            <p>
              { item.amount }
            </p>
          </div>
        );
      } 
      else {  
        return (
          <div key={item._id}>
            <p>
              <Link to={url + item._id}>
                {item.name}
              </Link>
            </p>
          </div>
        );
      }
    })
   } 
   else {
     if (url === '/items/') {
       return (
         <p>there are no items, create one!</p>
       );
     } 
     else {
       return (
         <p>there are no rooms, create one!</p>
       );
     }
   } 

  return (
    <div className="items">
      { Items }
    </div>
  );
};

export default List;
