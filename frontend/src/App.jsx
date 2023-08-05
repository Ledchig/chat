import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/NotFound';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import AuthProvider from './context/AuthProvider';
import routes from './routes';

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={routes.chatPagePath} element={<PrivateRoute />} />
          <Route path={routes.loginPagePath} element={<Login />} />
          <Route path={routes.signupPagePath} element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
    <ToastContainer />
  </AuthProvider>
);

export default App;
