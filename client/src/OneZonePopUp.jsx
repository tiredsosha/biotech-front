import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setZonesLedThunk,
  setZonesLedValue, setZonesPowerThunk, setZonesPowerValue, setZonesSoundThunk, setZonesSoundValue,
} from './redux/slices/zonesSlice';

function OneZonePopUp({ isVisible = false, oneZone, onClose }) {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  const { powerValue, soundValue, ledValue } = oneZone;
  const dispatch = useDispatch();

  const powerHandler = () => {
    dispatch(setZonesPowerThunk({ zone: oneZone.zoneName, value: powerValue }));
  };

  const contentHandler = () => {
    try {
      axios.post('/zones/content', { zone: oneZone.zoneName });
    } catch (err) {
      console.error(err);
    }
  };

  const ballsHandler = () => {
    try {
      axios.post('/zones/balls', { zone: oneZone.zoneName });
    } catch (err) {
      console.error(err);
    }
  };

  const soundHandler = () => {
    dispatch(setZonesSoundThunk({ zone: oneZone.zoneName, value: soundValue }));
  };

  const ledHandler = () => {
    dispatch(setZonesLedThunk({ zone: oneZone.zoneName, value: ledValue }));
  };

  const seansHandler = () => {
    try {
      axios('/session');
    } catch (err) {
      console.error(err);
    }
  };

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <div className="main_zones__control__zone">
            <div onClick={onClose} className="main_zones__control__zone__close">
              <img alt="" src="img/biotech_close.png" className="close" />
            </div>
            <div className=".main_zones__control__zone__name">
              <h4>{oneZone.rusName}</h4>
            </div>

          </div>
          <div className="main_zones__control__status">
            <h2>Cтатус:</h2>
            <div className="status-text">
              <span id="Status">{oneZone.status}</span>
            </div>
          </div>
          <div className="toggle">
            <div className="toggle-text">
              <h2>Питание:</h2>
            </div>
            <div className="switch-container">
              <input
                value={powerValue}
                className="toggle-power"
                checked={powerValue ? 'checked' : ''}
                type="checkbox"
                onClick={powerHandler}
                onChange={() => (dispatch(setZonesPowerValue(oneZone.zoneName)))}
              />
            </div>
          </div>
          {(() => {
            if (oneZone.zoneName === 'simulation') {
              return (
                <>
                  <button onClick={contentHandler} type="button" className="button">Перезагрузить контент</button>
                  <button onClick={ballsHandler} type="button" className="button">Нулевая позиция шаров</button>
                </>
              );
            }
            if (['calls', 'future'].includes(oneZone.zoneName)) {
              return (
                <div className="toggle">
                  <div className="toggle-text"><h2>Звук:</h2></div>
                  <div className="switch-container">
                    <input
                      onClick={soundHandler}
                      checked={soundValue ? 'checked' : ''}
                      onChange={() => (dispatch(setZonesSoundValue(oneZone.zoneName)))}
                      className="toggle-sound"
                      type="checkbox"
                    />
                  </div>
                </div>
              );
            }
            if (['dna_left', 'dna_right', 'biomaterials', 'biotech'].includes(oneZone.zoneName)) {
              return (
                <button type="button" onClick={contentHandler} className="button">Перезагрузить контент</button>
              );
            }
            if (oneZone.zoneName === 'calls') {
              return (
                <>
                  <div className="toggle">
                    <div className="toggle-text"><h2>Звук:</h2></div>
                    <div className="switch-container">
                      <input
                        onClick={soundHandler}
                        onChange={() => (dispatch(setZonesSoundValue(oneZone.zoneName)))}
                        checked={soundValue ? 'checked' : ''}
                        className="toggle-sound"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <div className="toggle">
                    <div className="toggle-text"><h2>Led ленты:</h2></div>
                    <div className="switch-container">
                      <input
                        onClick={ledHandler}
                        onChange={() => (dispatch(setZonesLedValue(oneZone.zoneName)))}
                        checked={ledValue ? 'checked' : ''}
                        className="toggle-led"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </>
              );
            }
            if (oneZone.zoneName === 'biolum') {
              return (
                <>
                  <button
                    type="button"
                    onClick={seansHandler}
                    className="button"
                  >
                    Запуск сеанса
                  </button>
                  <button
                    type="button"
                    onClick={contentHandler}
                    className="button"
                  >
                    Перезагрузить контент
                  </button>
                </>
              );
            }
            if (['genetic', 'bioremediation', 'cloning'].includes(oneZone.zoneName)) {
              return (
                <>
                  <div className="toggle">
                    <div className="toggle-text">
                      <h2>Звук:</h2>
                    </div>
                    <div className="switch-container">
                      <input
                        onClick={soundHandler}
                        onChange={() => (dispatch(setZonesSoundValue(oneZone.zoneName)))}
                        checked={soundValue ? 'checked' : ''}
                        className="toggle-sound"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={contentHandler}
                    className="button"
                  >
                    Перезагрузить контент

                  </button>
                </>
              );
            }
            if (oneZone.zoneName === 'cityfarm') {
              return (
                <>
                  <div className="toggle">
                    <div className="toggle-text"><h2>Звук:</h2></div>
                    <div className="switch-container">
                      <input
                        onClick={soundHandler}
                        onChange={() => (dispatch(setZonesSoundValue(oneZone.zoneName)))}
                        checked={soundValue ? 'checked' : ''}
                        className="toggle-sound"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <div className="toggle">
                    <div className="toggle-text"><h2>Led-ленты:</h2></div>
                    <div className="switch-container">
                      <input
                        onClick={ledHandler}
                        checked={ledValue ? 'checked' : ''}
                        onChange={() => (dispatch(setZonesLedValue(oneZone.zoneName)))}
                        className="toggle-led"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <button type="button" onClick={contentHandler} className="button">Перезагрузить контент</button>
                </>
              );
            }
            if (oneZone.zoneName === 'reactor') {
              return (
                <>
                  <div className="toggle">
                    <div className="toggle-text"><h2>Звук:</h2></div>
                    <div className="switch-container">
                      <input
                        onClick={soundHandler}
                        onChange={() => (dispatch(setZonesSoundValue(oneZone.zoneName)))}
                        checked={soundValue ? 'checked' : ''}
                        className="toggle-sound"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <button type="button" onClick={ledHandler} className="button">Led-ленты</button>
                </>
              );
            }
            return (
              <>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

export default React.memo(OneZonePopUp);
