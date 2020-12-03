import React, {useState, useContext} from 'react';
import {CurrentUserContext} from '../ContextProvider/CurrentUserContextProvider';
import Cookies from 'universal-cookie';
import './Login.css';
import {IconButton} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import googleIcon from '../images/common/google.jpg';
import {useHistory} from 'react-router-dom';
import {auth, provider} from '../firebase';

export default function Login() {
  let [account, setAccount] = useState({email: '', password: ''});
  let [visiblePwd, setVisiblePwd] = useState(false);

  const history = useHistory();
  const {setUser, setUserLoading} = useContext(CurrentUserContext);

  const cookies = new Cookies();

  const handleLoginWithPwd = async (event) => {
    event.preventDefault();
    cookies.remove('token');
    const {email, password} = account;

    try {
      const loginResponse = await fetch(
        'https://shopeeholic-backend.herokuapp.com/users/login/pwd',
        {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            'content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      const loginJson = await loginResponse.json();
      const {token, currentUser} = await loginJson;

      if (token && currentUser) {
        setUserLoading(false);
        setUser(currentUser);
        cookies.set('token', token);
        history.push('/');
      } else {
        setUserLoading(true);
        alert('Login.jsx with password' + JSON.stringify(loginJson));
      }
    } catch (err) {
      setUserLoading(true);
      alert('Login.jsx with password' + JSON.stringify(err));
    }
  };

  const handleLoginWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        if (result.user) {
          try {
            const loginResponse = await fetch(
              'https://shopeeholic-backend.herokuapp.com/users/login/google',
              {
                method: 'POST',
                body: JSON.stringify({
                  email: result.user.email,
                }),
                headers: {
                  'content-type': 'application/json; charset=UTF-8',
                },
              }
            );

            const loginJson = await loginResponse.json();
            const {token, currentUser} = await loginJson;

            if (token && currentUser) {
              setUserLoading(false);
              setUser(currentUser);
              cookies.set('token', token);
              history.push('/');
            } else {
              setUserLoading(true);
              alert('Login.jsx with google', JSON.stringify(loginJson));
            }
          } catch (err) {
            setUserLoading(true);
            alert('Login.jsx with google' + JSON.stringify(err));
          }
        }
      })
      .catch((err) => alert(JSON.stringify(err.message)));
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Login</h1>

        <div className="login__form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="vertical__spacing"
            onChange={(e) => setAccount({...account, email: e.target.value})}
          />
          <input
            type={visiblePwd ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="vertical__spacing"
            onChange={(e) => setAccount({...account, password: e.target.value})}
          />

          <IconButton
            className="visible__password__btn"
            onClick={() => setVisiblePwd(!visiblePwd)}
          >
            {visiblePwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>

          <p>Forget your password</p>

          <button
            type="submit"
            className="login__btn"
            onClick={handleLoginWithPwd}
          >
            Login
          </button>
        </div>

        <div className="login__google__container">
          <p>Or</p>
          <button onClick={handleLoginWithGoogle}>
            <img src={googleIcon} alt="google" />
            Continue with Google
          </button>
        </div>

        <div className="signup__btn__container ">
          <div className="term">
            <span>By continuing with Shopeeholic, you agreed with </span>
            <span>Terms of Service, Privacy Policy</span>
          </div>

          <p onClick={() => history.push('/signup')}>
            Not on Shopeeholic yet? Sign up
          </p>
        </div>
      </div>
    </div>
  );
}
