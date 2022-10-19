import React from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import { NavLink } from 'react-router-dom';

const ProfilHotel = () => {
  const uid = useContext(UidContext);
  const hotels = useSelector((state) => state.hotelsReducer);
  const myHotel = hotels.filter((hotel) => hotel.posterId === uid);

  return (
    <div className="establishment">
      <h2>Mes Hebergements</h2>
      <div className="establishment__card">
        {myHotel.map((hotel) => (
          <div className="thumbnail" key={hotel._id}>
            <a href={`/hotel/${hotel._id}`}>
              <img className="thumbnail__img" src={hotel.photos[0]} alt="Image hotel" />
              <h3>{hotel.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilHotel;
