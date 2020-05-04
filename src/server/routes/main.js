/* eslint-disable no-unused-vars */
import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import serverRoutes from '../../frontend/routes/serverRoutes';
import reducer from '../../frontend/reducers';
import initialState from '../../frontend/initialState';
import renderFullPage from '../render/index';

const main = (req, res, next) => {
  try {
    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();

    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          {renderRoutes(serverRoutes)}
        </StaticRouter>
      </Provider>
    );

    res.send(renderFullPage(html, preloadedState, req.hashManifest));
  } catch (error) {
    next(error);
  }
};

export default main;
