const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { Zone, Museum } = require('./db/models');

const PORT = 3001;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mStatus', async (req, res) => {
  try {
    const mStatus = await Museum.findAll();
    return res.json(mStatus[0]);
  } catch (err) {
    return console.error(err);
  }
});

app.post('/status', async (req, res) => {
  try {
    Object.keys(req.body.data).forEach(async (key) => {
      await Zone.update(
        { status: req.body.data[key] },
        { where: { zoneName: key } },
      );
    });
    const updatedZones = await Zone.findAll({ order: [['id']] });
    return res.json(updatedZones);
  } catch (err) {
    return console.error(err);
  }
});

app.post('/zPower', async (req, res) => {
  const { zoneValue } = req.body;
  try {
    await Zone.update(
      { powerValue: !zoneValue.value },
      { where: { zoneName: zoneValue.zone } },
    );
    return res.sendStatus(200);
  } catch (err) {
    return console.error(err);
  }
});

app.post('/zLed', async (req, res) => {
  const { zoneValue } = req.body;
  try {
    await Zone.update(
      { ledValue: !zoneValue.value },
      { where: { zoneName: zoneValue.zone } },
    );
    return res.sendStatus(200);
  } catch (err) {
    return console.error(err);
  }
});
app.post('/zSound', async (req, res) => {
  const { zoneValue } = req.body;
  try {
    await Zone.update(
      { soundValue: !zoneValue.value },
      { where: { zoneName: zoneValue.zone } },
    );
    return res.sendStatus(200);
  } catch (err) {
    return console.error(err);
  }
});

app.post('/mPower', async (req, res) => {
  const { museumPowerValue } = req.body;
  try {
    await Museum.update({ powerValue: !museumPowerValue.value }, { where: {} });
    await Zone.update({ powerValue: !museumPowerValue.value }, { where: {} });
    return res.sendStatus(200);
  } catch (err) {
    return console.error(err);
  }
});

app.post('/mSound', async (req, res) => {
  const { museumSoundValue } = req.body;
  try {
    await Museum.update({ soundValue: !museumSoundValue.value }, { where: {} });
    await Zone.update({ soundValue: !museumSoundValue.value }, { where: {} });
    return res.sendStatus(200);
  } catch (err) {
    return console.error(err);
  }
});

app.listen(PORT, () => {
  console.log('server start on port', PORT);
});
