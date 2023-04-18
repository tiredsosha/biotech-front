import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const PORT_DB = 'http://localhost:3001';
const zonesSlice = createSlice({
  name: 'zones',
  initialState: [],
  reducers: {
    setZonesStatus: (state, action) => action.payload,

    setAllZonesPowerValue: (state, action) => state.map((oneZone) => ({ ...oneZone, powerValue: !action.payload, ledValue: !action.payload })),

    setAllZonesSoundValue: (state, action) => state.map((oneZone) => ({ ...oneZone, soundValue: !action.payload })),

    setZonesPowerValue: (state, action) =>
      state.map((oneZone) =>
        ((oneZone.zoneName === action.payload) ? { ...oneZone, powerValue: !oneZone.powerValue } : oneZone)),

    setZonesSoundValue: (state, action) =>
      state.map((oneZone) =>
        ((oneZone.zoneName === action.payload) ? { ...oneZone, soundValue: !oneZone.soundValue } : oneZone)),

    setZonesLedValue: (state, action) =>
      state.map((oneZone) =>
        ((oneZone.zoneName === action.payload) ? { ...oneZone, ledValue: !oneZone.ledValue } : oneZone)),
  },
});

export const {
  setZonesStatus, setZonesPowerValue, setZonesSoundValue, setZonesLedValue, setAllZonesPowerValue, setAllZonesSoundValue,
} = zonesSlice.actions;

export const getZonesStatusThunk = () => (dispatch) => {
  try {
    axios.get('/status')
      .then((res) => axios.post('/status', { data: res.data }, { baseURL: PORT_DB }))
      .then((res) => dispatch(setZonesStatus(res.data)));
  } catch (err) {
    console.error(err);
  }
};

export const setZonesPowerThunk = (zoneValue) => (dispatch) => {
  try {
    axios.post('/zPower', zoneValue)
      .then(axios.post('/zPower', { zoneValue }, { baseURL: PORT_DB }));
    if (!zoneValue.powerValue && zoneValue.zone === 'cityfarm') {
      dispatch(setZonesLedValue(zoneValue.zone));
      axios.post('/zLed', { zoneValue }, { baseURL: PORT_DB });
    }
  } catch (err) {
    console.error(err);
  }
};

export const setZonesSoundThunk = (zoneValue) => () => {
  try {
    axios.post('/zSound', zoneValue)
      .then(axios.post('/zSound', { zoneValue }, { baseURL: PORT_DB }));
  } catch (err) {
    console.error(err);
  }
};

export const setZonesLedThunk = (zoneValue) => () => {
  try {
    axios.post('/zLed', zoneValue)
      .then(axios.post('/zLed', { zoneValue }, { baseURL: PORT_DB }));
  } catch (err) {
    console.error(err);
  }
};

export default zonesSlice.reducer;
