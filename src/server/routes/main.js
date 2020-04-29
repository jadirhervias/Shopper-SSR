import React from 'react';
// import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
// import { StaticRouter, Route, Switch } from 'react-router';
// import { Provider } from 'react-redux';
// import reducers from '../../frontend/reducers/index';
// import Login from '../../frontend/containers/auth/Login';
import App from '../../frontend/containers/App';
// import Home from '../../frontend/components/home/Home';
// import RutaPrivada from '../../frontend/components/rutas/RutaPrivada';
import renderFullPage from '../render/index';

const main = (req, res, next) => {
  try {
    const html = renderToString(<App />);

    res.send(renderFullPage(html, req.hashManifest));
  } catch (error) {
    next(error);
  }
};

export default main;
