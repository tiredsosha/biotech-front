import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const zonesSlice = createSlice({
  name: 'zones',
  initialState: [
    {
      rusName: 'Эфиромасличные', zoneName: 'etherium', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Симуляция', zoneName: 'simulation', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Мировые вызовы', zoneName: 'calls', status: 'OK', powerValue: false, soundValue: false,
    },
    {
      rusName: 'ДНК Левая', zoneName: 'dna_left', status: 'OK', powerValue: false,
    },
    {
      rusName: 'ДНК Правая', zoneName: 'dna_right', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Биореактор', zoneName: 'reactor', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Фуднет', zoneName: 'foodnet', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Биоматериалы', zoneName: 'biomaterials', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Медицина', zoneName: 'medicine', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Биолюминисценция', zoneName: 'biolum', status: 'OK', powerValue: false, soundValue: false,
    },
    {
      rusName: 'Биотехнология', zoneName: 'biotech', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Биоразлагаемость', zoneName: 'biorecycle', status: 'OK', powerValue: false, soundValue: false,
    },
    {
      rusName: 'Сити-ферма', zoneName: 'cityfarm', status: 'OK', powerValue: false, soundValue: false, ledValue: false,
    },
    {
      rusName: 'Будущее', zoneName: 'future', status: 'OK', powerValue: false, soundValue: false,
    },
    {
      rusName: 'Генетика', zoneName: 'genetic', status: 'OK', powerValue: false, soundValue: false,
    },
    {
      rusName: 'Биоремедиация', zoneName: 'bioremediation', status: 'OK', powerValue: false, soundValue: false,
    },
    {
      rusName: 'Клонирование', zoneName: 'cloning', status: 'OK', powerValue: false, soundValue: false,
    },
    {
      rusName: 'Гаприн', zoneName: 'gaprin', status: 'OK', powerValue: false, ledValue: false,
    },
  ],
  reducers: {
    setZonesStatus: (state, action) => {
      state.map((oneZone) => {
        for (const [key, values] of Object.entries(action.payload)) {
          if (oneZone.zoneName === key) {
            oneZone.status = values;
          }
        }
        return oneZone;
      });
    },

    setAllZonesPowerValue: (state, action) => state.map((oneZone) => ({ ...oneZone, powerValue: action.payload, ledValue: action.payload })),

    setAllZonesSoundValue: (state, action) => state.map((oneZone) => ({ ...oneZone, soundValue: action.payload })),

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
  axios('/status')
    .then((res) => dispatch(setZonesStatus(res.data)));
};

export const setZonesPowerThunk = (zoneValue) => (dispatch) => {
  axios.post('/zPower', zoneValue);
  if (!zoneValue.powerValue) {
    dispatch(setZonesLedValue(zoneValue.zone));
  }
};

export const setZonesSoundThunk = (zoneValue) => (dispatch) => {
  axios.post('/zSound', zoneValue);
};

export const setZonesLedThunk = (zoneValue) => (dispatch) => {
  axios.post('/zLed', zoneValue);
};

export default zonesSlice.reducer;
