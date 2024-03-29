import React, { useState } from 'react';
import OneZonePopUp from './OneZonePopUp';

export default function OneZone({ oneZone }) {
  const [isModal, setModal] = useState(false);

  return (

    <div className="main_zones__content" style={oneZone.status !== 'OK' ? { borderColor: 'red' } : { borderColor: '' }}>
      <div className="main_zones__content__click" onClick={() => setModal(true)}>
        <div className="main_zones__content__image">
          <img src="img/biotech-img.png" alt="" className="img" />
        </div>
        <div className="main_zones__content__text">
          <h3 style={oneZone.status !== 'OK' ? { color: 'red' } : { color: '' }}>{oneZone.rusName}</h3>
        </div>
      </div>

      <OneZonePopUp
        isVisible={isModal}
        oneZone={oneZone}
        onClose={() => setModal(false)}
      />

    </div>

  );
}
