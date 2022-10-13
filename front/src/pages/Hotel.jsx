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

const Hotel = () => {
  const uid = useContext(UidContext);
  const [files, setFiles] = useState('');
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();

  const validateForm = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
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
      console.log(newhotel);
      await dispatch(addHotel(newhotel));
      dispatch(getAllHotels());
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
                    <select id="rooms" multiple onChange={handleSelect}>
                      {/*    {data &&
                        data.map((room) => (
                          <option key={room._id} value={room._id}>
                            {room.title}
                          </option>
                        ))} */}
                    </select>
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
