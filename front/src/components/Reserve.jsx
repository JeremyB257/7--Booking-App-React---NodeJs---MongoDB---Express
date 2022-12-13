import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../components/SearchContext';
import { useSelector } from 'react-redux';

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const data = useSelector((state) => state.hotelReducer);

  const { dates } = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      /*  await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${process.env.REACT_APP_PUBLIC_URL}/api/hotel/${data._id}/availability/`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      */
      setOpen(false);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  function formatTime(s) {
    var date = new Date(s);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var date = date.getDate();
    var formattedTime = date + ' ' + month + ' ' + year;
    return formattedTime;
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <i className="fa-solid fa-circle-xmark close" onClick={() => setOpen(false)}></i>
        <span>Selectionnez la chambre:</span>
        <p>Du: {formatTime(alldates[0])} </p>
        <p>Au: {formatTime(alldates[1])} </p>
        {data.roomsList.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Personnes max: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}€</div>
            </div>
            <div className="rSelectRooms">
              <div className="room">
                <label>{item.title}</label>
                <input type="checkbox" value={item._id} onChange={handleSelect} disabled={!isAvailable(item)} />
              </div>
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reservez Maintenant!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
