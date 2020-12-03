import React, {useState, useEffect, useContext} from 'react';
import {CurrentUserContext} from '../../ContextProvider/CurrentUserContextProvider';
import './EditInfo.css';
import Cookies from 'universal-cookie';

function EditInfo({currentUser}) {
  const [newInfo, setNewInfo] = useState({});
  const {setUserLoading, setUser} = useContext(CurrentUserContext);
  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    setNewInfo(currentUser);
  }, [currentUser, setNewInfo]);

  const handleEditInfo = async (event) => {
    event.preventDefault();
    const {username, role, email} = newInfo;

    try {
      const uploadAvatarResponse = await fetch(
        'https://shopeeholic-backend.herokuapp.com/users/me/info',
        {
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer '.concat(token),
            'content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({username, role, email}),
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
            alert(uploadAvatarJson.message);
          } else {
            setUserLoading(true);
            alert(
              'EditInfo.jsx err in reset current user' +
                JSON.stringify({currentUserJson})
            );
          }
        } catch (err) {
          setUserLoading(true);
          alert('EditInfo.jsx err in trye' + JSON.stringify({err}));
        }
      } else {
        setUserLoading(true);
        alert(
          'EditInfo.jsx err in uploadAvatarJson' +
            JSON.stringify({uploadAvatarJson})
        );
      }
    } catch (err) {
      alert('err in trycattch block' + JSON.stringify(err));
    }
  };

  return (
    <div className="edit__info">
      <h1>Edit your info</h1>
      <form className="edit__info__form">
        <input
          type="text"
          value={newInfo.username}
          onChange={(e) => setNewInfo({...newInfo, username: e.target.value})}
        />
        <input
          type="text"
          value={newInfo.email}
          onChange={(e) => setNewInfo({...newInfo, email: e.target.value})}
        />

        <div className="role__container">
          {currentUser.role === 'client' ? (
            <>
              <input
                type="radio"
                name="role"
                value="client"
                defaultChecked
                onClick={(e) => {
                  setNewInfo({...newInfo, role: e.target.value});
                }}
              />
              <label htmlFor="client">i want to be a client</label>
              <br />
              <input
                type="radio"
                name="role"
                value="saler"
                onClick={(e) => {
                  setNewInfo({...newInfo, role: e.target.value});
                }}
              />
              <label htmlFor="saler">i want to be a saleman</label>
              <br />
            </>
          ) : (
            <>
              <input
                type="radio"
                name="role"
                value="client"
                onClick={(e) => {
                  setNewInfo({...newInfo, role: e.target.value});
                }}
              />
              <label htmlFor="client">i want to be a client</label>
              <br />
              <input
                type="radio"
                name="role"
                value="saler"
                defaultChecked
                onClick={(e) => {
                  setNewInfo({...newInfo, role: e.target.value});
                }}
              />
              <label htmlFor="saler">i want to be a saleman</label>
              <br />
            </>
          )}
        </div>
        <button onClick={handleEditInfo}>Update</button>
      </form>
    </div>
  );
}

export default EditInfo;
