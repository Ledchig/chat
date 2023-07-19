import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Chat from './components/ChatPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { SocketContext } from './context/index.js';
import { api } from './context/socketContext.js';

const App = () => {
  
  return (
  <AuthProvider>
    <SocketContext.Provider value={api}>
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
    </SocketContext.Provider>
  </AuthProvider>
);
};

export default App;
