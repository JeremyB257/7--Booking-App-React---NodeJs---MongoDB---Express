import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getHotel } from '../actions/hotel.actions';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Reserve from '../components/Reserve';
import { SearchContext } from '../components/SearchContext';

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const uid = useContext(UidContext);
  const hotelData = useSelector((state) => state.hotelReducer);
  const { city, dates } = useContext(SearchContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotel(window.location.pathname));
  }, []);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 2 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 2 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (uid) {
      setOpenModal(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <i className="fa-solid fa-circle-xmark close" onClick={() => setOpen(false)}></i>
              <i className="fa-solid fa-circle-arrow-left arrow" onClick={() => handleMove('l')}></i>
              <div className="sliderWrapper">
                <img src={hotelData.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <i className="fa-solid fa-circle-arrow-right arrow" onClick={() => handleMove('r')}></i>
            </div>
          )}
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{hotelData.name}</h1>
            <div className="hotelAddress">
              <i className="fa-solid fa-location-dot"></i>
              <span>{hotelData.address}</span>
            </div>
            <span className="hotelDistance">Excellente localisation – {hotelData.distance}m du centre</span>
            <span className="hotelPriceHighlight">
              Reservez pour {hotelData.cheapestPrice}€ dans cet etablissement et obtenez un petit dejeuner offert !
            </span>
            <div className="hotelImages">
              {hotelData.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{hotelData.title}</h1>
                <p className="hotelDesc">{hotelData.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Parfait pour {days} nuit !</h1>
                <span>Localisé dans le coeur de {hotelData.city}, cet établisement obtiens le score de 9.8 !</span>
                <h2>
                  <b>{days * hotelData.cheapestPrice} €</b> ({days} nuits)
                </h2>
                <button onClick={handleClick}>Réservez maintenant!</button>
              </div>
            </div>
          </div>
        </div>
        {openModal && <Reserve setOpen={setOpenModal} hotelId={hotelData._id} />}
      </main>
      <Footer />
    </>
  );
};

export default Hotel;
