import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFetch from '../useFetch';
import CardEstablishement from './Card_establishement';
import CardFeatured from './Card_featured';

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
            <CardEstablishement key={hotel._id} hotel={hotel} />
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
            .sort((a, b) => b.rating.length - a.rating.length)
            .slice(0, 3)
            .map((hotel) => (
              <CardFeatured key={hotel._id} hotel={hotel} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Lodging;
