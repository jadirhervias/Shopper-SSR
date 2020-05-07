/* eslint-disable no-unused-vars */
import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import axios from 'axios';
import { config } from '../config';
import serverRoutes from '../../frontend/routes/serverRoutes';
import reducer from '../../frontend/reducers';
import renderFullPage from '../render/index';

const main = async (req, res, next) => {
  try {
    console.log('COOKIES AL INICIAR APP');
    console.log(req.cookies);

    let initialState;
    const { email, fullName, id, token } = req.cookies;

    try {
      const { data } = await axios({
        url: `${config.apiUrl}/shops`,
        method: 'GET',
        // headers: {
        //   Authorization: token
        // }
      });

      // array
      const shops = data;
      // const shops = data.data;

      if (!email || !fullName || !id) {
        initialState = {
          user: {},
          searchResults: [],
          myList: [],
          shops,
        };
      } else {
        initialState = {
          user: {
            id,
            email,
            fullName,
          },
          searchResults: [],
          myList: [],
          shops,
        };
      }
    } catch (error) {
      initialState = {
        user: {},
        searchResults: [],
        myList: [],
        shops: [],
      };
      console.log(
        `ERROR CON EL INITIAL STATE (NO HAY USUARIO LOGEADO):\n${error}`
      );
    }

    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const isLogged = initialState.user.id;

    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          {renderRoutes(serverRoutes(isLogged))}
        </StaticRouter>
      </Provider>
    );

    // OSCAR
    // res.send(renderFullPage(html, preloadedState, req.hashManifest));

    res.send(renderFullPage(html, preloadedState));
  } catch (error) {
    next(error);
  }
};

export default main;
