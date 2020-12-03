import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';

export const CurrentUserContext = React.createContext();

export default function CurrentUserContextProvider(props) {
  let cookies = new Cookies();
  let token = cookies.get('token');
  const [currentUser, setUser] = useState({});
  let [getCurrentUserLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
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
        } else {
          setUserLoading(true);
          console.error('CurrentUserContextProvider.jsx', currentUserJson);
        }
      } catch (err) {
        setUserLoading(true);
        console.error('CurrentUserContextProvider.jsx', err);
      }
    };

    fetchCurrentUser();
  }, [token]);

  console.log('currentUSer', currentUser);
  return (
    <CurrentUserContext.Provider
      value={{currentUser, setUser, getCurrentUserLoading, setUserLoading}}
    >
      {props.children}
    </CurrentUserContext.Provider>
  );
}
