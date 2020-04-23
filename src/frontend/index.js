import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import './assets/styles/App.scss';

if (typeof window !== 'undefined') {
  ReactDOM.render(<App />, document.getElementById('root'));
}
