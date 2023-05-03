import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

  // добавить кнопки и проверить их
  const powerHandler = (e) => {
    try {
      axios.post('/zPower', { zone: oneZone.zoneName, value: e.target.value });
      if (!e.target.value && ['calls', 'sityfarm', 'reactor'].includes(oneZone.zoneName)) {
        axios.post('/zLed', { zone: oneZone.zoneName, value: e.target.value });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const soundHandler = (e) => {
    try {
      axios.post('/zSound', { zone: oneZone.zoneName, value: e.target.value });
    } catch (err) {
      console.error(err);
    }
  };

  const ledHandler = (e) => {
    try {
      axios.post('/zLed', { zone: oneZone.zoneName, value: e.target.value });
    } catch (err) {
      console.error(err);
    }
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

  const seansHandler = () => {
    try {
      axios('/session');
    } catch (err) {
      console.error(err);
    }
  };

  const stopHandler = () => {
    try {
      axios('/stop');
    } catch (err) {
      console.error(err);
    }
  };

  const restartHandler = () => {
    try {
      axios('/restart');
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
          <div className="modal-buttons">
            <h2>Питание:</h2>
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
                <div className="modal-buttons">
                  <h2 className="h2_modal">Звук:</h2>
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
                  <div className="modal-buttons">
                    <h2 className="h2_modal">Звук:</h2>
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
                  <div className="modal-buttons">
                    <h2>Led ленты:</h2>
                    <button
                      onClick={soundHandler}
                      type="button"
                      className="button button_modal"
                      value="true"
                    >
                      Вкл
                    </button>
                    <button
                      onClick={soundHandler}
                      type="button"
                      className="button button_modal"
                      value="false"
                    >
                      Выкл
                    </button>
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
                  <button
                    type="button"
                    onClick={stopHandler}
                    className="button"
                  >
                    Остановить
                  </button>
                  <button
                    type="button"
                    onClick={restartHandler}
                    className="button"
                  >
                    Перезапустить
                  </button>
                </>
              );
            }
            if (['genetic', 'bioremediation', 'cloning'].includes(oneZone.zoneName)) {
              return (
                <>
                  <div className="modal-buttons">
                    <h2 className="h2_modal">Звук:</h2>
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
                  <div className="modal-buttons">
                    <h2 className="h2_modal">Звук:</h2>
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
                  <div className="modal-buttons">
                    <h2>Led ленты:</h2>
                    <button
                      onClick={soundHandler}
                      type="button"
                      className="button button_modal"
                      value="true"
                    >
                      Вкл
                    </button>
                    <button
                      onClick={soundHandler}
                      type="button"
                      className="button button_modal"
                      value="false"
                    >
                      Выкл
                    </button>
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
            if (oneZone.zoneName === 'reactor') {
              return (
                <>
                  <div className="modal-buttons">
                    <h2 className="h2_modal">Звук:</h2>
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
                  <div className="modal-buttons">
                    <h2>Led ленты:</h2>
                    <button
                      onClick={soundHandler}
                      type="button"
                      className="button button_modal"
                      value="true"
                    >
                      Вкл
                    </button>
                    <button
                      onClick={soundHandler}
                      type="button"
                      className="button button_modal"
                      value="false"
                    >
                      Выкл
                    </button>
                  </div>
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
