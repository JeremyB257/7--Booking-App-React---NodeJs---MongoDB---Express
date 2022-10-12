import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'upload');
    try {
      const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dfsaszwfq/image/upload', data);

      dispatch(uploadPicture(uploadRes.data.url, userData._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action="" onSubmit={handleClick} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
