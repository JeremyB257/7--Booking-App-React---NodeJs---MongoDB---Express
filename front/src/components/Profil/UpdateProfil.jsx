import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils';
import UploadImg from './UploadImg';

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const [bio, setBio] = useState(`${userData.bio}`);
  const [updateForm, setUpdateForm] = useState(false);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="User-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
              </>
            )}
            {updateForm && (
              <>
                <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
