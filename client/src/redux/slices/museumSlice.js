import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAllZonesPowerValue, setAllZonesSoundValue } from './zonesSlice';

const PORT_DB = 'http://localhost:3001';
const museumSlice = createSlice({
  name: 'museum',
  initialState: {},
  reducers: {
    initStatusMuseum: (state, action) => action.payload,
    setMuseumPower: (state, action) => ({ ...state, powerValue: !action.payload }),
    setMuseumSound: (state, action) => ({ ...state, soundValue: !action.payload }),
  },
});

export const { setMuseumPower, setMuseumSound, initStatusMuseum } = museumSlice.actions;

export const getMuseumStatusThunk = () => (dispatch) => {
  try {
    axios.get('/mStatus', { baseURL: PORT_DB })
      .then((res) => dispatch(initStatusMuseum(res.data)));
  } catch (err) {
    console.error(err);
  }
};
export const setMuseumPowerThunk = (museumPowerValue) => (dispatch) => {
  try {
    axios.post('/mPower', museumPowerValue)
      .then(dispatch(setAllZonesPowerValue(museumPowerValue.value)))
      .then(axios.post('/mPower', { museumPowerValue }, { baseURL: PORT_DB }));
  } catch (err) {
    console.error(err);
  }
};
export const setMuseumSoundThunk = (museumSoundValue) => (dispatch) => {
  try {
    axios.post('/mSound', museumSoundValue)
      .then(dispatch(setAllZonesSoundValue(museumSoundValue.value)))
      .then(axios.post('/mSound', { museumSoundValue }, { baseURL: PORT_DB }));
  } catch (err) {
    console.error(err);
  }
};

export default museumSlice.reducer;
