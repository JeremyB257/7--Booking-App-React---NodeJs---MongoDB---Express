import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import { NavLink } from 'react-router-dom';
import DeleteHotel from './DeleteHotel';

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
            <DeleteHotel id={hotel._id} />
            <NavLink to={`/hotel/${hotel._id}`}>
              <img className="thumbnail__img" src={hotel.photos[0]} alt="Image hotel" />
              <h3>{hotel.title}</h3>
            </NavLink>
            <p> ({hotel.rating.length} Avis)</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilHotel;
