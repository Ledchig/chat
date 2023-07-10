import Chat from './ChatPage.jsx';
import Login from './Login.jsx';
const PrivateRoute = () => {
  const user = localStorage.getItem('user');

  return (
    user ? (<Chat />) : (<Login />)
  );
};

export default PrivateRoute;