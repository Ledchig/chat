/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AuthContext } from './index';

function AuthProvider({ children }) {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(userData ? userData.username : null);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data.username);
  };

  const logOut = () => {
    localStorage.clear();
    setUser(null);
  };

  const auth = {
    user,
    logIn,
    logOut,
  };

  return (<AuthContext.Provider value={auth}>{children}</AuthContext.Provider>);
}

export default AuthProvider;
