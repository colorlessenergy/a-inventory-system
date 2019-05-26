import React from 'react';

function RoomsList ({ Rooms }) {
    const RoomsList = Rooms.length ? (
        Rooms.map((room) => {
            return (
                <div key={room.id}>
                    <p>{room.name}</p>
                </div>
            )
        })
    ) : (
        <p>you have no rooms create one!</p>
    )

    return (
        <div className="rooms">
            { RoomsList }
        </div>
    )
}

export default RoomsList;