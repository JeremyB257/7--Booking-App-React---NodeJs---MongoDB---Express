import React from 'react';
import { roomInputs } from '../formSource';

const Room = () => {
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(',').map((room) => ({ number: room }));
    try {
      await axios.post(`${process.env.REACT_APP_PUBLIC_URL}/rooms/${hotelId}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="room-form">
      <div className="form-container">
        {roomInputs.map((input) => (
          <div className="formInput" key={input.id}>
            <label>{input.label}</label>
            <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
          </div>
        ))}
        <div className="formInput">
          <label>Chambres</label>
          <textarea
            onChange={(e) => setRooms(e.target.value)}
            placeholder="301, 302, 303(virgule entre les chambres)"
          />
        </div>

        <button onClick={handleClick}>Envoyer</button>
      </div>
    </div>
  );
};

export default Room;
