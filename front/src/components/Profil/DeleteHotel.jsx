import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteHotel } from '../../actions/hotel.actions';
import { getAllHotels } from '../../actions/hotels.actions';

const DeleteHotel = (props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteHotel(props.id)).then(() => dispatch(getAllHotels()));
  };

  return (
    <span
      onClick={() => {
        if (window.confirm('Voulez-vous supprimer cet etablissement ?')) {
          handleDelete();
        }
      }}>
      <i className="fa-solid fa-circle-xmark"></i>
    </span>
  );
};

export default DeleteHotel;
