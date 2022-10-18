import React, { useContext, useState } from 'react';
import { UidContext } from '../components/AppContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LogPage from './LogPage';
import { hotelInputs } from '../formSource';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllHotels } from '../actions/hotels.actions';
import { addHotel } from '../actions/hotel.actions';
import Room from '../components/Room';

const Hotel = () => {
  const uid = useContext(UidContext);
  const [files, setFiles] = useState('');
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  const [room, setRoom] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    document.querySelector('.error').innerHTML = '';
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'upload');
          const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/lamadev/image/upload', data);

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };
      console.log(info);
      if (
        info.adress &&
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
      } else {
        document.querySelector('.error').innerHTML = "Le formulaire n'est pas remplis correctement";
        document.querySelector('.success').innerHTML = '';
      }
    } catch (err) {
      console.log(err);
    }
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
                    <i className="fa-solid fa-plus" onClick={() => setRoom(!room)}></i>
                    {room ? (
                      <div className="roomModal">
                        <Room />
                      </div>
                    ) : null}
                    <table>
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Description</th>
                          <th>Prix</th>
                          <th>Chambres</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="message-error">
                    <div className="error"></div>
                    <div className="success"></div>
                  </div>
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
