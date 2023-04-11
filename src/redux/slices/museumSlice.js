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

export const setMuseumPowerThunk = (museumPowerValue) => (dispatch) => {
  axios.post('/mPower', museumPowerValue)
    .then(dispatch(setAllZonesPowerValue(!museumPowerValue.value)));
};
export const setMuseumSoundThunk = (museumSoundValue) => (dispatch) => {
  axios.post('/mSound', museumSoundValue)
    .then(dispatch(setAllZonesSoundValue(!museumSoundValue.value)));
};

export default museumSlice.reducer;
