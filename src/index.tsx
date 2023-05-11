import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./store";
import {positions, Provider as AlertProvider, transitions} from 'react-alert';
import {Provider} from "react-redux";
import {Alert} from "./components/alert";

const options = {
    position: positions.TOP_RIGHT,
    timeout: 3000,
    offset: '20px',
    transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <AlertProvider template={Alert} {
              ...options
          }>
          <App />
          </AlertProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
