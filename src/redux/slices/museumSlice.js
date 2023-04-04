import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAllZonesPowerValue, setAllZonesSoundValue, setZonesPowerThunk } from './zonesSlice';

const zones = [
  {
    zoneName: 'etherium',
  },
  {
    zoneName: 'simulation',
  },
  {
    zoneName: 'calls',
  },
  {
    zoneName: 'dna_left',
  },
  {
    zoneName: 'dna_right',
  },
  {
    zoneName: 'reactor',
  },
  {
    zoneName: 'foodnet',
  },
  {
    zoneName: 'biomaterials',
  },
  {
    zoneName: 'medicine',
  },
  {
    zoneName: 'biolum',
  },
  {
    zoneName: 'biotech',
  },
  {
    zoneName: 'biorecycle',
  },
  {
    zoneName: 'cityfarm',
  },
  {
    zoneName: 'future',
  },
  {
    zoneName: 'genetic',
  },
  {
    zoneName: 'bioremediation',
  },
  {
    zoneName: 'cloning',
  },
  {
    zoneName: 'gaprin',
  },
];

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
  dispatch(setAllZonesPowerValue(!museumPowerValue.value));
  zones.forEach((zone) => setZonesPowerThunk({ zone: zone.zoneName, powerValue: museumPowerValue.value }));
};
export const setMuseumSoundThunk = (museumSoundValue) => (dispatch) => {
  dispatch(setAllZonesSoundValue(!museumSoundValue.value));
  zones.forEach((zone) => setZonesPowerThunk({ zone: zone.zoneName, soundValue: museumSoundValue.value }));
};

export default museumSlice.reducer;
