import { configureStore } from '@reduxjs/toolkit';
import zonesSlice from './slices/zonesSlice';

export const store = configureStore({
  reducer: {
    zones: zonesSlice,
  },
});
