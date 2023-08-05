import io from 'socket.io-client';
import { addMessage } from './slices/messagesSlice';
import store from './slices/index';
import {
  addChannel, removeChannel, renameChannel, setCurrentChannel,
} from './slices/channelsSlice';

const socket = io();

socket.on('newMessage', (payload) => {
  store.dispatch(addMessage(payload));
});

socket.on('newChannel', (payload) => {
  store.dispatch(addChannel(payload));
  store.dispatch(setCurrentChannel(payload));
});

socket.on('removeChannel', (payload) => {
  store.dispatch(removeChannel(payload));
});

socket.on('renameChannel', (payload) => {
  store.dispatch(renameChannel(payload));
});

export default {
  sendMessage: (message) => new Promise((resolve, reject) => {
    socket.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        reject();
      }
    });
  }),
  addChannel: (channel) => new Promise((resolve, reject) => {
    socket.emit('newChannel', channel, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        reject();
      }
    });
  }),
  removeChannel: (id) => new Promise((resolve, reject) => {
    socket.emit('removeChannel', id, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        reject();
      }
    });
  }),
  renameChannel: (channel) => new Promise((resolve, reject) => {
    socket.emit('renameChannel', channel, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      } else {
        reject();
      }
    });
  }),
};
