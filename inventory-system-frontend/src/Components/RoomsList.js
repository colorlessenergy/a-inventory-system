import React from 'react';

function RoomsList ({ rooms }) {
  console.log(rooms, 'rooms in the props of RoomsList');

  const roomsList = rooms.length ? (
    rooms.map((room) => {
      return (
        <div key={room._id}>
          <p>{room.name}</p>
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