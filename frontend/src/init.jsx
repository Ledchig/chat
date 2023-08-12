import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import io from 'socket.io-client';
import resources from './locales/index';
import { SocketContext } from './context/index';
import App from './App';
import store from './slices/index';
import {
  addChannel, removeChannel, renameChannel,
} from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';

const init = () => {
  const censorshipDictionaryRu = leoProfanity.getDictionary('ru');
  leoProfanity.add(censorshipDictionaryRu);
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'dev',
  };

  i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  const socketPromise = (type, data) => new Promise((resolve, reject) => {
    socket.emit(type, data, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        reject();
      }
    });
  });

  const sockets = {
    sendMessage: (message) => socketPromise('newMessage', message),
    addChannel: (channel) => socketPromise('newChannel', channel),
    removeChannel: (id) => socketPromise('removeChannel', id),
    renameChannel: (channel) => socketPromise('renameChannel', channel),
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketContext.Provider value={sockets}>
              <App />
            </SocketContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
