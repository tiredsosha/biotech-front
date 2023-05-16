import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const zonesSlice = createSlice({
  name: 'zones',
  initialState: [
    {
      rusName: 'Эфиромасличные', zoneName: 'etherium', status: 'OK',
    },
    {
      rusName: 'Симуляция', zoneName: 'simulation', status: 'OK',
    },
    {
      rusName: 'Мировые вызовы', zoneName: 'calls', status: 'OK',
    },
    {
      rusName: 'ДНК Левая', zoneName: 'dna_left', status: 'OK',
    },
    {
      rusName: 'ДНК Правая', zoneName: 'dna_right', status: 'OK',
    },
    {
      rusName: 'Биореактор', zoneName: 'reactor', status: 'OK',
    },
    {
      rusName: 'Фуднет', zoneName: 'foodnet', status: 'OK',
    },
    {
      rusName: 'Биоматериалы', zoneName: 'biomaterials', status: 'OK',
    },
    {
      rusName: 'Медицина', zoneName: 'medicine', status: 'OK',
    },
    {
      rusName: 'Биолюминисценция', zoneName: 'biolum', status: 'OK',
    },
    {
      rusName: 'Биотехнология', zoneName: 'biotech', status: 'OK',
    },
    {
      rusName: 'Биоразлагаемость', zoneName: 'biorecycle', status: 'OK',
    },
    {
      rusName: 'Сити-ферма', zoneName: 'cityfarm', status: 'OK',
    },
    {
      rusName: 'Будущее', zoneName: 'future', status: 'OK',
    },
    {
      rusName: 'Генетика', zoneName: 'genetic', status: 'OK',
    },
    {
      rusName: 'Биоремедиация', zoneName: 'bioremediation', status: 'OK',
    },
    {
      rusName: 'Клонирование', zoneName: 'cloning', status: 'OK',
    },
    {
      rusName: 'Гаприн', zoneName: 'gaprin', status: 'OK',
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
  },
});

export const {
  setZonesStatus,
} = zonesSlice.actions;

export const getZonesStatusThunk = () => (dispatch) => {
  try {
    axios.get('/status')
      .then((res) => dispatch(setZonesStatus(res.data)));
  } catch (err) {
    console.error(err);
  }
};

export default zonesSlice.reducer;
