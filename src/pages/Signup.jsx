import React, {useState, useContext} from 'react';
import {CurrentUserContext} from '../ContextProvider/CurrentUserContextProvider';
import Cookies from 'universal-cookie';

import googleIcon from '../images/common/google.jpg';
import {useHistory} from 'react-router-dom';
import {auth, provider} from '../firebase';
import './Signup.css';

export default function Signup() {
  const {setUser, setUserLoading} = useContext(CurrentUserContext);
  const history = useHistory();
  const [role, setRole] = useState('client');
  const cookies = new Cookies();

  const handleSignup = () => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        if (result.user) {
          console.log(result);
          const signupResponse = await fetch(
            'https://shopeeholic-backend.herokuapp.com/users/signup',
            {
              method: 'POST',
              body: JSON.stringify({
                email: result.user.email,
                role,
                avatar: result.user.photoURL,
                username: result.user.displayName,
              }),
              headers: {
                'content-type': 'application/json; charset=UTF-8',
              },
            }
          );

          const signupJson = await signupResponse.json();
          const {token, currentUser} = await signupJson;
          if (token && currentUser) {
            setUserLoading(false);
            setUser(currentUser);
            cookies.set('token', token);
            console.log(token, currentUser, 'signup res');
            history.push('/');
          } else {
            setUserLoading(true);
            alert('Signup.jsx ' + JSON.stringify(signupJson));
          }
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <h1>Sign up</h1>

        <form className="role__radio">
          <input
            type="radio"
            name="role"
            value="client"
            defaultChecked
            onClick={(e) => {
              setRole(e.target.value);
            }}
          />
          <label htmlFor="client">i want to be a client</label>
          <br />
          <input
            type="radio"
            name="role"
            value="saler"
            onClick={(e) => {
              setRole(e.target.value);
            }}
          />
          <label htmlFor="saler">i want to be a saleman</label>
          <br />
        </form>

        <button onClick={handleSignup}>
          <img src={googleIcon} alt="google" />
          Signup with Google
        </button>

        <div className="signup__btn__container ">
          <div className="term">
            <span>By continuing with Shopeeholic, you agreed with </span>
            <span>Terms of Service, Privacy Policy</span>
          </div>

          <p onClick={() => history.push('/login')}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
}
