import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import OneZone from './OneZone';

export default function MainMuseum() {
  const zonesArray = useSelector((store) => store.zones);

  const powerHandler = (e) => {
    axios.post('/mPower', { value: e.target.value });
  };

  const soundHandler = (e) => {
    axios.post('/mSound', { value: e.target.value });
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
              <h1>Питание:</h1>
              <div className="modal-buttons">
                <button
                  onClick={powerHandler}
                  type="button"
                  className="button button_modal"
                  value="true"
                >
                  Вкл
                </button>
                <button
                  onClick={powerHandler}
                  type="button"
                  className="button button_modal"
                  value="false"
                >
                  Выкл
                </button>
              </div>
              <h1>Звук:</h1>
              <div className="modal-buttons">
                <button
                  onClick={soundHandler}
                  type="button"
                  className="button button_modal"
                  value="true"
                >
                  Громко
                </button>
                <button
                  onClick={soundHandler}
                  type="button"
                  className="button button_modal"
                  value="false"
                >
                  Тихо
                </button>
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
