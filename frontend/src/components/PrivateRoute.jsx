import Chat from './ChatPage.jsx';
import Login from './Login.jsx';
import { useAuthContext } from '../context/index.js';

const PrivateRoute = () => {
  const { user } = useAuthContext();
  console.log(user);

  return (
    user ? (<Chat />) : (<Login />)
  );
};

export default PrivateRoute;