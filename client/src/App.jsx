import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainMuseum from './MainMuseum';
import { getZonesStatusThunk } from './redux/slices/zonesSlice';
import { getMuseumStatusThunk } from './redux/slices/museumSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getZonesStatusThunk());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getZonesStatusThunk());
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    dispatch(getMuseumStatusThunk());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getMuseumStatusThunk());
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="overlay">
        <div className="overlay-gray" />
      </div>

      <div className="header">
        <div className="header-logo">
          <img alt="" src="img/biotech_logo.png" className="logo" />
        </div>
      </div>
      <div className="overlay">
        <div className="overlay-gray" />
      </div>

      <div className="orientation">
        <h1>Поверните экран</h1>
      </div>
      <MainMuseum />
    </>
  );
}

export default App;
