import React, { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Lodging from '../components/Home/Lodging';
import Navbar from '../components/Navbar';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useFetch from '../components/useFetch';
import { SearchContext } from '../components/SearchContext';

const Home = () => {
  const [destination, setDestination] = useState('Lille');
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 3600 * 1000 * 24),
      key: 'selection',
    },
  ]);

  const [info, setInfo] = useState({});
  let filter = '';

  const handleFilter = (e) => {
    if (e.target.checked) {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    } else {
      setInfo((prev) => {
        const copy = { ...prev };
        delete copy[e.target.id];
        return copy;
      });
    }
  };

  if (info.eco) filter += '&eco=true';
  if (info.animals) filter += '&animals=true';
  if (info.fami) filter += '&fami=true';
  if (info.love) filter += '&love=true';

  const { data, error, reFetch } = useFetch(`/hotel?city=${destination}${filter}`);
  const { dispatch } = useContext(SearchContext);

  const handleSearch = (e) => {
    e.preventDefault();
    reFetch();

    dispatch({ type: 'NEW_SEARCH', payload: { city: destination, dates } });
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="search-filter">
          <h1>Trouvez votre hébergement pour des vacances de rêve</h1>
          <p>En plein centre ville ou en pleine nature</p>
          <div className="headerSearchItem">
            <form action="">
              <i className="fa-solid fa-location-dot"></i>
              <input
                type="text"
                placeholder="Lille, France"
                required
                onChange={(e) => setDestination(e.target.value)}
              />
              <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(
                dates[0].startDate,
                'dd/MM/yyyy'
              )} aux ${format(dates[0].endDate, 'dd/MM/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()}
                />
              )}
              <button onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Rechercher</span>
              </button>
            </form>
          </div>

          <div className="filter">
            <h2>Filtres</h2>
            <div className="filter__selection">
              <input type="checkbox" id="eco" onChange={handleFilter} />
              <div>
                <i className="fa-solid fa-money-bill-wave "></i>
                <p>Economique</p>
              </div>
            </div>
            <div className="filter__selection">
              <input type="checkbox" id="fami" onChange={handleFilter} />
              <div>
                <i className="fa-solid fa-child-reaching"></i>
                <p>Familial</p>
              </div>
            </div>
            <div className="filter__selection">
              <input type="checkbox" id="love" onChange={handleFilter} />
              <div>
                <i className="fa-solid fa-heart"></i>
                <p>Romantique</p>
              </div>
            </div>
            <div className="filter__selection">
              <input type="checkbox" id="animals" onChange={handleFilter} />
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
        <Lodging destination={destination} dates={dates} data={data} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
