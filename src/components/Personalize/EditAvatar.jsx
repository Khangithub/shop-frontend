import React, {useState, useContext} from 'react';
import {CurrentUserContext} from '../../ContextProvider/CurrentUserContextProvider';
import {IconButton} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {storage} from '../../firebase';
import Cookies from 'universal-cookie';

import './EditAvatar.css';

function EditAvatar({currentUser}) {
  const [progress, setProgress] = useState(0);
  const cookies = new Cookies();
  const token = cookies.get('token');
  const {setUserLoading, setUser} = useContext(CurrentUserContext);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      console.log(event.target.files[0], 'image');
      const uploadTask = storage.ref(`shopeeholic/${image.name}`).put(image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref('shopeeholic')
            .child(image.name)
            .getDownloadURL()
            .then(async (url) => {
              try {
                const uploadAvatarResponse = await fetch(
                  'https://shopeeholic-backend.herokuapp.com/users/me/avatar',
                  {
                    method: 'PATCH',
                    headers: {
                      Authorization: 'Bearer '.concat(token),
                      'content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({newImg: url}),
                  }
                );

                const uploadAvatarJson = await uploadAvatarResponse.json();

                if (uploadAvatarJson.doc) {
                  try {
                    const currentUserResponse = await fetch(
                      'https://shopeeholic-backend.herokuapp.com/users/me',
                      {
                        method: 'GET',
                        headers: {
                          Authorization: 'Bearer '.concat(token),
                          'content-type': 'application/json; charset=UTF-8',
                        },
                      }
                    );

                    const currentUserJson = await currentUserResponse.json();

                    if (currentUserJson) {
                      setUserLoading(false);
                      setUser(currentUserJson.currentUser);
                      setProgress(200);
                      alert(uploadAvatarJson.message);
                      setProgress(0);
                    } else {
                      setUserLoading(true);
                      alert(
                        'EditAvatar.jsx err in reset current user' +
                          JSON.stringify({currentUserJson})
                      );
                    }
                  } catch (err) {
                    setUserLoading(true);
                    alert('EditAvatar.jsx err in trye' + JSON.stringify({err}));
                  }
                } else {
                  setUserLoading(true);
                  alert(
                    'EditAvatar.jsx err in uploadAvatarJson' +
                      JSON.stringify({uploadAvatarJson})
                  );
                }
              } catch (err) {
                alert('err in trycattch block' + JSON.stringify(err));
              }
            });
        }
      );
    }
  };

  return (
    <div className="edit__avatar">
      <img src={currentUser.avatar} alt="avatar" />
      <div className="upload__img__btn__container">
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="icon-button-file">
          <progress value={progress} max={200} />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera fontSize="large" />
          </IconButton>
        </label>
      </div>
    </div>
  );
}

export default EditAvatar;
