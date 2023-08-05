import React from 'react';
import Chat from './ChatPage';
import { useAuthContext } from '../context/index';
import Login from './Login';

function PrivateRoute() {
  const { user } = useAuthContext();

  return (
    user ? (<Chat />) : (<Login />)
  );
}

export default PrivateRoute;
