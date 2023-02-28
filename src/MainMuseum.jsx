import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OneZone from './OneZone';
import {
  setMuseumPower, setMuseumPowerThunk, setMuseumSound, setMuseumSoundThunk,
} from './redux/slices/museumSlice';

export default function MainMuseum() {
  const zonesArray = useSelector((store) => store.zones);
  const museum = useSelector((store) => store.museum);
  const dispatch = useDispatch();

  const powerHandler = () => {
    dispatch(setMuseumPowerThunk(museum.powerValue));
  };

  const soundHandler = () => {
    dispatch(setMuseumSoundThunk(museum.soundValue));
  };

  return (
    <div>
      <div className="main">
        <div className="main-logo">
          <img alt="" src="img/biotech_logo.png" className="logo" />
        </div>
        <div className="main_museum">
          <div className="main_museum__block">
            <div className="main_museum__htext">
              <h1>Управление музеем:</h1>
            </div>
            <div className="main_museum__control">
              <div className="toggle">
                <div className="toggle-text">
                  <h2>Питание:</h2>
                </div>
                <div className="switch-container">
                  <input
                    onClick={powerHandler}
                    checked={museum.powerValue ? 'checked' : ''}
                    onChange={() => dispatch(setMuseumPower(!museum.powerValue))}
                    className="toggle-power"
                    type="checkbox"
                  />
                </div>
              </div>
              <div className="toggle">
                <div className="toggle-text">
                  <h2>Звук:</h2>
                </div>
                <div className="switch-container">
                  <input
                    onClick={soundHandler}
                    onChange={() => dispatch(setMuseumSound(!museum.soundValue))}
                    checked={museum.soundValue ? 'checked' : ''}
                    className="toggle-sound"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main_zones_h1">
          <h1>Зоны</h1>
        </div>
        <div className="main_zones">
          {zonesArray?.map((oneZone) => (
            <OneZone key={oneZone.zoneName} oneZone={oneZone} />
          ))}
        </div>
      </div>
    </div>
  );
}
