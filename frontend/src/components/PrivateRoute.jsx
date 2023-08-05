import React from 'react';
import Chat from './ChatPage';
import { useAuthContext } from '../hooks/index';
import Login from './Login';

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return (
    user ? (<Chat />) : (<Login />)
  );
};

export default PrivateRoute;
