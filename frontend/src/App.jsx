import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Header from './components/Header.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import SignUp from './components/SignUp.jsx';

const App = () => {
  
  return (
  <AuthProvider>
      <div className='d-flex flex-column h-100'>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PrivateRoute />} />
          <Route path='/login' element={<PrivateRoute />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </div>
  </AuthProvider>
);
};

export default App;
