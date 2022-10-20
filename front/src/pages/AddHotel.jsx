import React, { useContext, useState } from 'react';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LogPage from './LogPage';
import { hotelInputs, roomInputs } from '../formSource';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllHotels } from '../actions/hotels.actions';
import { addHotel } from '../actions/hotel.actions';
import Room from '../components/Room';

//

const Hotel = () => {
  const uid = useContext(UidContext);
  const [files, setFiles] = useState('');
  const [info, setInfo] = useState({});
  const [room, setRoom] = useState({});
  const [roomsList, setRoomsList] = useState([]);
  const dispatch = useDispatch();
  const [roomModal, setRoomModal] = useState(false);

  const handleRoomChange = (e) => {
    e.preventDefault();
    setRoom((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRoomClick = (e) => {
    e.preventDefault();
    if (roomsList.length === 0) {
      setRoomsList([room]);
    } else {
      if (roomsList.some((e) => e.roomNumber === room.roomNumber)) {
        document.querySelector('.error').innerHTML = 'La chambre existe deja';
        document.querySelector('.success').innerHTML = '';
      } else {
        document.querySelector('.error').innerHTML = '';
        setRoomsList([...roomsList, room]);
      }
    }
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    document.querySelector('.error').innerHTML = '';
    try {
      var list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'upload');
          const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dfsaszwfq/image/upload', data);

          const { url } = uploadRes.data;
          return url;
        })
      );

      if (list.length === 0) {
        list = [
          'https://res.cloudinary.com/dfsaszwfq/image/upload/v1666272189/hoteldefaut_tucggi.jpg',
          'https://res.cloudinary.com/dfsaszwfq/image/upload/v1666272189/hoteldefaut_tucggi.jpg',
          'https://res.cloudinary.com/dfsaszwfq/image/upload/v1666272189/hoteldefaut_tucggi.jpg',
        ];
      } else if (list.length === 1) {
        list = [
          ...list,
          'https://res.cloudinary.com/dfsaszwfq/image/upload/v1666272189/hoteldefaut_tucggi.jpg',
          'https://res.cloudinary.com/dfsaszwfq/image/upload/v1666272189/hoteldefaut_tucggi.jpg',
        ];
      } else if (list.length === 2) {
        list = [...list, 'https://res.cloudinary.com/dfsaszwfq/image/upload/v1666272189/hoteldefaut_tucggi.jpg'];
      } else {
      }

      const newhotel = {
        ...info,
        posterId: uid,
        roomsList,
        photos: list,
      };

      if (
        info.address &&
        info.cheapestPrice &&
        info.city &&
        info.desc &&
        info.distance &&
        info.name &&
        info.title &&
        info.type
      ) {
        dispatch(addHotel(newhotel));
        document.querySelector('.success').innerHTML = 'Hotel ajouter avec succes';
        document.querySelector('.error').innerHTML = '';
        dispatch(getAllHotels());
        setRoomsList([]);
        setFiles('');
      } else {
        document.querySelector('.error').innerHTML = "Le formulaire n'est pas remplis correctement";
        document.querySelector('.success').innerHTML = '';
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetButton = (e) => {
    e.preventDefault();
    setRoomsList([]);
    setFiles('');
    document.querySelector('.success').innerHTML = '';
    document.querySelector('.error').innerHTML = '';
  };

  return uid ? (
    <>
      <Navbar />
      <main>
        <div className="new">
          <div className="newContainer">
            <div className="top">
              <h1>Ajouter un nouvel hebergement</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img
                  src={
                    files.length >= 1
                      ? URL.createObjectURL(files[0])
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
                <img
                  src={
                    files.length >= 2
                      ? URL.createObjectURL(files[1])
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
                <img
                  src={
                    files.length >= 3
                      ? URL.createObjectURL(files[2])
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <form>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <i className="fa-solid fa-file-arrow-up icon"></i>
                    </label>
                    <input
                      type="file"
                      id="file"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className="formInput">
                    <label>Types (obligatoire)</label>
                    <select id="type" onChange={handleChange}>
                      <option value="">--Type--</option>
                      <option value="hotel">Hotel</option>
                      <option value="villas">Villa</option>
                      <option value="apartments">Apartement</option>
                      <option value="house">Maison</option>
                      <option value="other">Autres</option>
                    </select>
                  </div>
                  {hotelInputs.map((input) => (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                    </div>
                  ))}
                  <div className="formInput">
                    <label>Animaux accepté</label>
                    <select id="animals" onChange={handleChange}>
                      <option value={false}>Non</option>
                      <option value={true}>Oui</option>
                    </select>

                    <label>Romantique</label>
                    <select id="love" onChange={handleChange}>
                      <option value={false}>Non</option>
                      <option value={true}>Oui</option>
                    </select>

                    <label>Familial</label>
                    <select id="fami" onChange={handleChange}>
                      <option value={false}>Non</option>
                      <option value={true}>Oui</option>
                    </select>

                    <label>Economique</label>
                    <select id="eco" onChange={handleChange}>
                      <option value={false}>Non</option>
                      <option value={true}>Oui</option>
                    </select>
                  </div>
                  <div className="selectRooms">
                    <label>Chambres</label>
                    <i className="fa-solid fa-plus" onClick={() => setRoomModal(!roomModal)}></i>
                    {roomModal ? (
                      <div className="roomModal">
                        <div className="room-form">
                          <div className="form-container">
                            {roomInputs.map((input) => (
                              <div className="formInput" key={input.id}>
                                <label>{input.label}</label>
                                <input
                                  id={input.id}
                                  type={input.type}
                                  placeholder={input.placeholder}
                                  onChange={handleRoomChange}
                                />
                              </div>
                            ))}

                            <button onClick={handleRoomClick}>Envoyer</button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <Room rooms={roomsList} />
                  </div>
                  <div className="message-error">
                    <div className="error"></div>
                    <div className="success"></div>
                  </div>
                  <button onClick={resetButton}>Reset </button>
                  <input type="submit" value="Envoyer" onClick={handleClick} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  ) : (
    <LogPage />
  );
};

export default Hotel;
