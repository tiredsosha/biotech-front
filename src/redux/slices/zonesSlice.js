import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as mqtt from 'precompiled-mqtt';
// import * as udp from 'dgram';
import { Buffer } from 'buffer';
// import { wol } from 'wol';

// для теста
// const client = mqtt.connect('mqtt://test.mosquitto.org');
const client = mqtt.connect('192.168.10.200');

// необходимо решить проблему с юдп и вол

// const UDPclient = udp.createSocket('udp4');
let port = 5000;
// let host = '';
let msg = '';

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
      rusName: 'Биореактор', zoneName: 'reactor', status: 'OK', powerValue: false, soundValue: false,
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
      rusName: 'Биолюминисценция', zoneName: 'biolum', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Биотехнология', zoneName: 'biotech', status: 'OK', powerValue: false,
    },
    {
      rusName: 'Биоразлагаемость', zoneName: 'biorecycle', status: 'OK', powerValue: false,
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
      rusName: 'Биоремендиация', zoneName: 'bioremediation', status: 'OK', powerValue: false, soundValue: false,
    },
    {
      rusName: 'Клонирование', zoneName: 'cloning', status: 'OK', powerValue: false, soundValue: false,
    },
    {
      rusName: 'Гаприн', zoneName: 'gaprin', status: 'OK', powerValue: false,
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

export const setZonesLedThunk = (zoneValue) => (dispatch) => {
  if (zoneValue.zone === 'reactor') {
    // port = 8009;
    // msg = Buffer.from('all_off');
    // const host1 = '192.168.11.84';
    // const host2 = '192.168.11.85';
    // UDPclient.send(msg, port, host1, (err) => {
    //   if (err) {
    //     console.error('Failed to send packet');
    //   }
    // });
    // UDPclient.send(msg, port, host2, (err) => {
    //   if (err) {
    //     console.error('Failed to send packet');
    //   }
    // });
  } else if (zoneValue.zone === 'cityfarm') {
    if (!zoneValue.ledValue) {
      axios('http://admin:admin@192.168.10.126/protect/rb0n.cgi');
    } else if (zoneValue.ledValue) {
      axios('http://admin:admin@192.168.10.126/protect/rb0f.cgi');
    }
  }
};

export const setZonesPowerThunk = (zoneValue) => (dispatch) => {
  if (!zoneValue.powerValue) {
    // если выключили зону
    dispatch(setZonesLedValue(zoneValue.zone));
    switch (zoneValue.zone) {
      case 'etherium':
        axios('http://admin:admin@192.168.10.123/protect/rb0n.cgi');
        break;
      case 'simulation':
        axios('http://admin:admin@192.168.10.108/protect/rb0n.cgi');
        client.on('connect', () => {
          client.publish('warden/simulation/commands/shutdown', 'simulation shutdown');
        });
        break;
      case 'calls':
        axios('http://admin:admin@192.168.10.111/protect/rb0n.cgi');
        break;
      case 'dna_left':
        client.on('connect', () => {
          client.publish('warden/dnk_left/commands/shutdown', 'dna_left shutdown');
        });
        break;
      case 'dna_right':
        client.on('connect', () => {
          client.publish('warden/dnk_right/commands/shutdown', 'dna_right shutdown');
        });
        break;
      case 'reactor':
        axios('http://admin:admin@192.168.10.116/protect/rb0n.cgi');
        axios('http://admin:admin@192.168.10.117/protect/rb0n.cgi');
        axios('http://admin:admin@192.168.10.117/protect/rb1n.cgi');
        axios('http://admin:admin@192.168.10.118/protect/rb0n.cgi');
        axios('http://admin:admin@192.168.10.118/protect/rb1n.cgi');
        axios('http://admin:admin@192.168.10.119/protect/rb0n.cgi');
        axios('http://admin:admin@192.168.10.119/protect/rb1n.cgi');
        axios('http://admin:admin@192.168.10.120/protect/rb0n.cgi');
        axios('http://admin:admin@192.168.10.120/protect/rb1n.cgi');
        axios('http://admin:admin@192.168.10.121/protect/rb0n.cgi');
        axios('http://admin:admin@192.168.10.121/protect/rb1n.cgi');
        axios('http://admin:admin@192.168.10.122/protect/rb0n.cgi');
        axios('http://admin:admin@192.168.10.122/protect/rb1n.cgi');
        dispatch(setZonesLedThunk({ zone: 'reactor', value: zoneValue.powerValue }));
        break;
      case 'foodnet':
        axios('http://admin:admin@192.168.10.114/protect/rb0n.cgi');
        break;
      case 'biomaterials':
        client.on('connect', () => {
          client.publish('warden/biomat/commands/shutdown', 'biomaterials shutdown');
        });
        break;
      case 'medicine':
        axios('http://admin:admin@192.168.10.125/protect/rb0n.cgi');
        break;
      case 'biolum':
        client.on('connect', () => {
          client.publish('warden/biolum/commands/shutdown', 'biolum shutdown');
        });
        break;
      case 'biotech':
        client.on('connect', () => {
          client.publish('warden/art/commands/shutdown', 'biotech shutdown');
        });
        break;
      case 'biorecycle':
        axios('http://admin:admin@192.168.10.112/protect/rb0n.cgi');
        break;
      case 'cityfarm':
        axios('http://admin:admin@192.168.10.110/protect/rb0n.cgi');
        axios('http://admin:admin@192.168.10.110/protect/rb1n.cgi');
        client.on('connect', () => {
          client.publish('warden/sity/commands/shutdown', 'cityfarm shutdown');
        });
        dispatch(setZonesLedThunk({ zone: 'cityfarm', value: zoneValue.powerValue }));
        break;
      case 'future':
        axios('http://admin:admin@192.168.10.113/protect/rb0n.cgi');
        break;
      case 'bioremediation':
        client.on('connect', () => {
          client.publish('warden/biorem/commands/shutdown', 'bioremediation shutdown');
        });
        break;
      case 'cloning':
        client.on('connect', () => {
          client.publish('warden/clone/commands/shutdown', 'cloning shutdown');
        });
        break;
      case 'genetic':
        client.on('connect', () => {
          client.publish('warden/genetic/commands/shutdown', 'genetic shutdown');
        });
        break;
      case 'gaprin':
        axios('http://admin:admin@192.168.10.115/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb2f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb3f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb4f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb5f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb7f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb6f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb1f.cgi');
        break;
      default:
        console.log('nothing happend');
    }
  } else {
    // если включили зону
    switch (zoneValue.zone) {
      case 'etherium':
        axios('http://admin:admin@192.168.10.123/protect/rb0f.cgi');
        break;
      case 'simulation':
        axios('http://admin:admin@192.168.10.108/protect/rb0f.cgi');
        break;
      case 'calls':
        axios('http://admin:admin@192.168.10.111/protect/rb0f.cgi');
        break;
      case 'dna_left':
        // todo:
        break;
      case 'dna_right':
        // todo:
        break;
      case 'reactor':
        axios('http://admin:admin@192.168.10.117/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.116/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.117/protect/rb1f.cgi');
        axios('http://admin:admin@192.168.10.118/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.118/protect/rb1f.cgi');
        axios('http://admin:admin@192.168.10.119/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.119/protect/rb1f.cgi');
        axios('http://admin:admin@192.168.10.120/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.120/protect/rb1f.cgi');
        axios('http://admin:admin@192.168.10.121/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.121/protect/rb1f.cgi');
        axios('http://admin:admin@192.168.10.122/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.122/protect/rb1f.cgi');
        break;
      case 'foodnet':
        axios('http://admin:admin@192.168.10.114/protect/rb0f.cgi');
        break;
      case 'biomaterials':
        // todo:
        break;
      case 'medicine':
        axios('http://admin:admin@192.168.10.125/protect/rb0f.cgi');
        break;
      case 'biolum':
        // wol.wake('00:01:2E:A4:E2:F9', (err, res) => {
        //   console.log('error:', err);
        // });
        break;
      case 'biotech':
        // todo:
        break;
      case 'biorecycle':
        axios('http://admin:admin@192.168.10.112/protect/rb0f.cgi');
        break;
      case 'cityfarm':
        axios('http://admin:admin@192.168.10.110/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.110/protect/rb1f.cgi');
        // wol.wake('00:01:2E:A4:E8:8C', (err, res) => {
        //   console.log('error:', err);
        // });
        break;
      case 'future':
        axios('http://admin:admin@192.168.10.113/protect/rb0f.cgi');
        break;
      case 'bioremediation':
        // wol.wake('00:01:2E:A4:E3:79', (err, res) => {
        //   console.log('error:', err);
        // });
        break;
      case 'cloning':
        // wol.wake('00:01:2E:A4:E7:51', (err, res) => {
        //   console.log('error:', err);
        // });
        break;
      case 'genetic':
        // wol.wake('00:01:2E:A4:E3:2B', (err, res) => {
        //   console.log('error:', err);
        // });
        break;
      case 'gaprin':
        axios('http://admin:admin@192.168.10.115/protect/rb0f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb1f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb2f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb3f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb4f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb5f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb6f.cgi');
        axios('http://admin:admin@192.168.10.115/protect/rb7f.cgi');
        break;
      default:
        console.log('nothing happend');
    }
  }
};

export const setZonesSoundThunk = (zoneValue) => (dispatch) => {
  port = 5000;
  if (!zoneValue.soundValue) {
    // sound off
    msg = Buffer.from('down');
    switch (zoneValue.zone) {
      case 'bioremediation':
        client.on('connect', () => {
          client.publish('warden/biorem/commands/volume', 30);
        });
        break;
      case 'cloning':
        client.on('connect', () => {
          client.publish('warden/clone/commands/volume', 30);
        });
        break;
      case 'genetic':
        client.on('connect', () => {
          client.publish('warden/genetic/commands/volume', 30);
        });
        break;
      case 'calls':
        // host = '192.168.11.113';
        // UDPclient.send(msg, port, host, (err) => {
        //   if (err) {
        //     console.error('Failed to send packet');
        //   }
        // });
        break;
      case 'reactor':
        // host = '192.168.10.133';
        // UDPclient.send(msg, port, host, (err) => {
        //   if (err) {
        //     console.error('Failed to send packet');
        //   }
        // });
        break;
      case 'cityfarm':
        // host = '192.168.10.113';
        // UDPclient.send(msg, port, host, (err) => {
        //   if (err) {
        //     console.error('Failed to send packet');
        //   }
        // });
        break;
      case 'future':
        // host = '192.168.11.40';
        // UDPclient.send(msg, port, host, (err) => {
        //   if (err) {
        //     console.error('Failed to send packet');
        //   }
        // });
        break;
      default:
        console.log('nothing happend');
    }
  } else {
    // sound on
    msg = Buffer.from('up');
    switch (zoneValue.zone) {
      case 'bioremediation':
        client.on('connect', () => {
          client.publish('warden/biorem/commands/volume', 80);
        });
        break;
      case 'cloning':
        client.on('connect', () => {
          client.publish('warden/clone/commands/volume', 80);
        });
        break;
      case 'genetic':
        client.on('connect', () => {
          client.publish('warden/genetic/commands/volume', 80);
        });
        break;
      case 'calls':
        // host = '192.168.11.113';
        // UDPclient.send(msg, port, host, (err) => {
        //   if (err) {
        //     console.error('Failed to send packet');
        //   }
        // });
        break;
      case 'reactor':
        // host = '192.168.10.133';
        // UDPclient.send(msg, port, host, (err) => {
        //   if (err) {
        //     console.error('Failed to send packet');
        //   }
        // });
        break;
      case 'cityfarm':
        // host = '192.168.10.113';
        // UDPclient.send(msg, port, host, (err) => {
        //   if (err) {
        //     console.error('Failed to send packet');
        //   }
        // });
        break;
      case 'future':
        // host = '192.168.11.40';
        // UDPclient.send(msg, port, host, (err) => {
        //   if (err) {
        //     console.error('Failed to send packet');
        //   }
        // });
        break;
      default:
        console.log('nothing happend');
    }
  }
};

export default zonesSlice.reducer;
