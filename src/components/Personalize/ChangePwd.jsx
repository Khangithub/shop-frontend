import React, {useState, useContext} from 'react';
import './ChangePwd.css';
import {IconButton} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Cookies from 'universal-cookie';
import {CurrentUserContext} from '../../ContextProvider/CurrentUserContextProvider';

function ChangePwd() {
  const {setUserLoading, setUser} = useContext(CurrentUserContext);
  const [newPwd, setNewPwd] = useState({
    pwd: '',
    confirmedPwd: '',
  });

  let [visiblePwd, setVisiblePwd] = useState({
    pwd: false,
    confirmedPwd: false,
  });

  const handleChangePwd = async (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const {pwd, confirmedPwd} = newPwd;

    try {
      const changePwdResponse = await fetch(
        'https://shopeeholic-backend.herokuapp.com/users/me/pwd',
        {
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer '.concat(token),
            'content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({pwd, confirmedPwd}),
        }
      );

      const changePwdJson = await changePwdResponse.json();

      if (changePwdJson.isChanged) {
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
            setNewPwd({
              pwd: '',
              confirmedPwd: '',
            });
            alert(changePwdJson.message);
          } else {
            setUserLoading(true);
            alert(
              'ChangePwd.jsx err in reset current user' +
                JSON.stringify({currentUserJson})
            );
          }
        } catch (err) {
          setUserLoading(true);
          alert('ChangePwd.jsx err in trye' + JSON.stringify({err}));
        }
      } else {
        // setUserLoading(true);
        alert(
          'ChangePwd.jsx err in changePwdJson' + JSON.stringify({changePwdJson})
        );
      }
    } catch (err) {
      alert('err in trycattch block' + JSON.stringify(err));
    }
  };
  return (
    <div className="change__pwd">
      <h1>Change password</h1>
      <form>
        <div className="input__container">
          <input
            type={visiblePwd.pwd ? 'text' : 'password'}
            placeholder="new password"
            value={newPwd.pwd}
            onChange={(e) => setNewPwd({...newPwd, pwd: e.target.value})}
          />
          <IconButton
            className="visible__password__btn"
            onClick={() => setVisiblePwd({...visiblePwd, pwd: !visiblePwd.pwd})}
          >
            {visiblePwd.pwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>

        <div className="input__container">
          <input
            type={visiblePwd.confirmedPwd ? 'text' : 'password'}
            placeholder="confirm new password"
            value={newPwd.confirmedPwd}
            onChange={(e) =>
              setNewPwd({...newPwd, confirmedPwd: e.target.value})
            }
          />
          <IconButton
            className="visible__password__btn"
            onClick={() =>
              setVisiblePwd({
                ...visiblePwd,
                confirmedPwd: !visiblePwd.confirmedPwd,
              })
            }
          >
            {visiblePwd.confirmedPwd ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </IconButton>
        </div>
        <button onClick={handleChangePwd}>Change</button>
      </form>
    </div>
  );
}

export default ChangePwd;
