/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import { AuthContext } from './index';

function AuthProvider({ children }) {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(userData ? userData.username : null);

  const logIn = ({ username }) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username });
  };

  const logOut = () => {
    localStorage.clear();
    setUser(null);
  };

  const auth = useMemo(() => ({
    logOut, logIn, user,
  }), []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
