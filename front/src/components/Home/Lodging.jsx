import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFetch from '../useFetch';

const Lodging = (props) => {
  const { data, error, reFetch } = useFetch(`/hotel?city=${props.destination}`);
  const [number, setNumber] = useState(6);

  const handleSeeMore = () => {
    setNumber(number + 3);
  };

  return (
    <section id="lodging" className="lodging">
      <div className="establishment">
        <h1>Hébergement à {props.destination}</h1>
        <div className="establishment__card">
          {props.data.slice(0, number).map((hotel) => (
            <div key={hotel._id} className="thumbnail">
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
        <h2 onClick={handleSeeMore}>Afficher plus</h2>
      </div>
      <div className="featured-establishment">
        <div className="featured-establishment__title">
          <h1>Les plus populaires</h1>
          <i className="fas fa-chart-line" aria-hidden="true"></i>
        </div>
        <div className="featured-establishment-card">
          {data
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
            .map((hotel) => (
              <div key={hotel._id} className="featured-thumbnail">
                <NavLink to={`/hotel/${hotel._id}`}>
                  <img className="featured-thumbnail__img" src={hotel.photos[0]} alt={hotel.title}></img>
                  <div className="featured-thumbnail-desc">
                    <h2 className="featured-thumbnail-desc__title">{hotel.title}</h2>
                    <p className="featured-thumbnail-desc__description">Nuit à partir de {hotel.cheapestPrice}€</p>
                    <div className="featured-thumbnail-desc__rating">
                      <i
                        className={hotel.rating > 0 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                      <i
                        className={hotel.rating > 1 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                      <i
                        className={hotel.rating > 2 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                      <i
                        className={hotel.rating > 3 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                      <i
                        className={hotel.rating > 4 ? 'fa-solid fa-star blue_star' : ' fa-solid fa-star grey_star'}></i>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Lodging;
