import React from 'react';
import { NavLink } from 'react-router-dom';

const Lodging = (props) => {
  console.log(props);
  return (
    <section id="lodging" className="lodging">
      <div className="establishment">
        <h1>Hébergement à {props.destination}</h1>
        <div className="establishment__card">
          {props.data.map((hotel) => (
            <div className="thumbnail">
              <NavLink to={`/hotel/${hotel._id}`}>
                <img className="thumbnail__img" src={hotel.photos[0]} alt={hotel.title}></img>
                <h2 className="thumbnail__title">{hotel.title}</h2>
                <p className="thumbnail__description">Nuit à partir de {hotel.cheapestPrice}€</p>
                <div className="thumbnail__rating">
                  <i className={hotel.rating > 0 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                  <i className={hotel.rating > 1 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                  <i className={hotel.rating > 2 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                  <i className={hotel.rating > 3 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                  <i className={hotel.rating > 4 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div className="featured-establishment"></div>
    </section>
  );
};

export default Lodging;
