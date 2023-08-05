import { useContext } from 'react';
import { AuthContext, SocketContext } from '../context/index';

export const useAuthContext = () => useContext(AuthContext);
export const useSocketContext = () => useContext(SocketContext);
