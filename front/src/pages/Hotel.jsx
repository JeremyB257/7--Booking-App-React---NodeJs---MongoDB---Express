import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotel } from '../actions/hotel.actions';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Reserve from '../components/Reserve';

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const uid = useContext(UidContext);
  const hotelData = useSelector((state) => state.hotelReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotel(window.location.pathname));
  }, []);

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  //const days = dayDifference(dates[0].endDate, dates[0].startDate);

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
            <span className="hotelDistance">Excellent location – {hotelData.distance}m from center</span>
            <span className="hotelPriceHighlight">
              Book a stay over ${hotelData.cheapestPrice} at this property and get a free airport taxi
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
                {/*   <h1>Perfect for a {days}-night stay!</h1>
                <span>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</span>
                <h2>
                  <b>${days * hotelData.cheapestPrice * options.room}</b> ({days} nights)
                </h2> */}
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
