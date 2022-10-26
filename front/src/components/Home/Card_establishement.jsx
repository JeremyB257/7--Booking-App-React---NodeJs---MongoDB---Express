import React from 'react';
import { NavLink } from 'react-router-dom';

const CardEstablishement = ({ hotel }) => {
  let sum = 0;

  if (hotel.rating.length > 0) {
    for (let i = 0; i < hotel.rating.length; i++) {
      sum += hotel.rating[i].rating;
    }
    sum /= hotel.rating.length;
  }

  return (
    <div className="thumbnail">
      <NavLink to={`/hotel/${hotel._id}`}>
        <img className="thumbnail__img" src={hotel.photos[0]} alt={hotel.title}></img>
        <h2 className="thumbnail__title">{hotel.title}</h2>
        <p className="thumbnail__description">Nuit à partir de {hotel.cheapestPrice}€</p>
        <div className="thumbnail__rating">
          <i className={sum > 0 ? 'fa-solid fa-star blue_star' : 'fa-solid fa-star grey_star'}></i>
          <i className={sum > 1 ? 'fa-solid fa-star blue_star' : 'fa-solid fa-star grey_star'}></i>
          <i className={sum > 2 ? 'fa-solid fa-star blue_star' : 'fa-solid fa-star grey_star'}></i>
          <i className={sum > 3 ? 'fa-solid fa-star blue_star' : 'fa-solid fa-star grey_star'}></i>
          <i className={sum > 4 ? 'fa-solid fa-star blue_star' : 'fa-solid fa-star grey_star'}></i>
          <p> ({hotel.rating.length} Avis)</p>
        </div>
      </NavLink>
    </div>
  );
};

export default CardEstablishement;
