import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './photosSlice';

export const store = configureStore({
    reducer: {
        photos: photosReducer,
    },
});
