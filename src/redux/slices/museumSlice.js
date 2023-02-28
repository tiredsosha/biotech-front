import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAllZonesPowerValue, setAllZonesSoundValue } from './zonesSlice';

const museumSlice = createSlice({
  name: 'museum',
  initialState: { powerValue: false, soundValue: false },
  reducers: {
    setMuseumPower: (state, action) => ({ ...state, powerValue: action.payload }),
    setMuseumSound: (state, action) => ({ ...state, soundValue: action.payload }),
  },
});

export const { setMuseumPower, setMuseumSound } = museumSlice.actions;

export const setMuseumPowerThunk = (powerValue) => (dispatch) => {
  axios.post('/museum/power', { powerValue })
    .then(dispatch(setAllZonesPowerValue(!powerValue)));
};
export const setMuseumSoundThunk = (soundValue) => (dispatch) => {
  axios.post('/museum/sound', { soundValue })
    .then(dispatch(setAllZonesSoundValue(!soundValue)));
};

export default museumSlice.reducer;
