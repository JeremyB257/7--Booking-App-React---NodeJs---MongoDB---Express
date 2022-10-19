import React from 'react';

const Room = (roomsList) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Chambre</th>
        </tr>
      </thead>
      <tbody>
        {roomsList.rooms.map((room) => {
          return (
            <tr key={room.roomNumber}>
              <td>{room.title}</td>
              <td>{room.desc}</td>
              <td>{room.price}</td>
              <td>{room.roomNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Room;
