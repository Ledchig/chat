import Chat from './ChatPage.jsx';
import { useAuthContext } from '../context/index.js';
import Login from './Login.jsx';

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return (
    user ? (<Chat />) : (<Login />)
  );
};

export default PrivateRoute;