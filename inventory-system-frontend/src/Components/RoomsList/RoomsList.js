import React from 'react';
import { Link } from 'react-router-dom';

function RoomsList ({ rooms }) {
  console.log(rooms, 'rooms in the props of RoomsList');

  const roomsList = rooms.length ? (
    rooms.map((room) => {
      return (
        <div key={room._id}>
          <p>
            <Link to='/items'>
              {room.name}
            </Link>
          </p>
        </div>
      );
    })
  ) : (
    <p>you have no rooms, create one!</p>
  );

  return (
    <div className="rooms">
      { roomsList }
    </div>
  );
};

export default RoomsList;
