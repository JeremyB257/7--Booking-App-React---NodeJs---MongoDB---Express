import React from 'react';

const SearchFilter = () => {
  return (
    <section className="search-filter">
      <h1>Trouvez votre hébergement pour des vacances de rêve</h1>
      <p>En plein centre ville ou en pleine nature</p>
      <form action="#">
        <i className="fa-solid fa-location-dot"></i>
        <input type="text" placeholder="Marseille, France" required />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Rechercher</span>
        </button>
      </form>

      <div className="filter">
        <h2>Filtres</h2>
        <div className="filter__selection">
          <input type="checkbox" id="filter-eco" />
          <div>
            <i className="fa-solid fa-money-bill-wave "></i>
            <p>Economique</p>
          </div>
        </div>
        <div className="filter__selection">
          <input type="checkbox" id="filter-Fami" />
          <div>
            <i className="fa-solid fa-child-reaching"></i>
            <p>Familial</p>
          </div>
        </div>
        <div className="filter__selection">
          <input type="checkbox" id="filter-lov" />
          <div>
            <i className="fa-solid fa-heart"></i>
            <p>Romantique</p>
          </div>
        </div>
        <div className="filter__selection">
          <input type="checkbox" id="filter-pets" />
          <div>
            <i className="fa-solid fa-dog"></i>
            <p>Animaux autorisés</p>
          </div>
        </div>
      </div>

      <div className="info">
        <i className="fa-solid fa-info"></i>
        <p>Plus de 500 logements sont disponibles dans cette ville</p>
      </div>
    </section>
  );
};

export default SearchFilter;
