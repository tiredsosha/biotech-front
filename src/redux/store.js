import { configureStore } from '@reduxjs/toolkit';
import zonesSlice from './slices/zonesSlice';
import museumSlice from './slices/museumSlice';

export const store = configureStore({
  reducer: {
    zones: zonesSlice,
    museum: museumSlice,
  },
});
