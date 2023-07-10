import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './components/App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './slices/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
