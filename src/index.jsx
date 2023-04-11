import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

const serverPort = 8080;

// надо смотреть как правильно это делать

// const currentDomain = window.location.hostname;
// if (currentDomain === 'localhost') {
//   serverPort = 8080; // порт для локального сервера
// } else {
//   serverPort = 8081; // порт для удаленного сервера
// }

axios.defaults.baseURL = `http://localhost:${serverPort}`;
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
