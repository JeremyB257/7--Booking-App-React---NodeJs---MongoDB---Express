import React from 'react';
import { NavLink } from 'react-router-dom';

const CardFeatured = ({ hotel }) => {
  let sum = 0;

  if (hotel.rating.length > 0) {
    for (let i = 0; i < hotel.rating.length; i++) {
      sum += hotel.rating[i].rating;
    }
    sum /= hotel.rating.length;
  }

  return (
    <div className="featured-thumbnail">
      <NavLink to={`/hotel/${hotel._id}`}>
        <img className="featured-thumbnail__img" src={hotel.photos[0]} alt={hotel.title}></img>
        <div className="featured-thumbnail-desc">
          <h2 className="featured-thumbnail-desc__title">{hotel.title}</h2>
          <p className="featured-thumbnail-desc__description">Nuit à partir de {hotel.cheapestPrice}€</p>
          <div className="featured-thumbnail-desc__rating">
            <i className={sum > 0 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
            <i className={sum > 1 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
            <i className={sum > 2 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
            <i className={sum > 3 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
            <i className={sum > 4 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
            <p> ({hotel.rating.length} Avis)</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default CardFeatured;
