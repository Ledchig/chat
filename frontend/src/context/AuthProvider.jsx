import React, { useState, useMemo } from 'react';
import { AuthContext } from './index';

const AuthProvider = ({ children }) => {
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

  const auth = useMemo(() => ({ user, logIn, logOut }), [user, logIn, logOut]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
