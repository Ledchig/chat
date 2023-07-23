import { configureStore } from '@reduxjs/toolkit';
import channelsReducer  from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalReducer from './modalSliice.js';

export default configureStore({
    reducer: {
        channelsInfo: channelsReducer,
        messagesInfo: messagesReducer,
        modal: modalReducer,
    },
});