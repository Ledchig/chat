import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import Header from './Header.jsx';
import AuthProvider from '../context/AuthProvider.jsx';
import Chat from './ChatPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => (
    <AuthProvider>
      <div className='d-flex flex-column h-100'>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path='/login' element={<PrivateRoute><Login /></PrivateRoute>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );

export default App;
