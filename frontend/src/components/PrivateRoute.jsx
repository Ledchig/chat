import Chat from './Chat.jsx';
import Login from './Login.jsx';
const PrivateRoute = () => {
  const user = localStorage.getItem('user');
  console.log(user);

  return (
    user ? (<Chat />) : (<Login />)
  );
};

export default PrivateRoute;