import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
// import './assets/styles/App.scss';

if (typeof window !== 'undefined') {
  ReactDOM.hydrate(<App />, document.getElementById('root'));
}
