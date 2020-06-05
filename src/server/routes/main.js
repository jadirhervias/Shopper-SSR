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
    // const { email, fullName, id, token } = req.cookies;
    const { email, token } = req.cookies;

    try {
      const { data } = await axios({
        url: `${config.apiUrl}/api/${config.apiVersion}/shops`,
        method: 'GET',
      });

      console.log('SHOPS');
      console.log(data.content);

      // Datos iniciales obtenidos de la API
      const shops = data.content;
      // const myList = data;

      // if (!email || !fullName || !id) {
      if (!email) {
        initialState = {
          user: {},
          searchResults: [],
          myList: [],
          shops,
          shoppingCar: {
            count: 0,
            total: 0,
            shop: '',
            products: [],
          },
          savedShoppingCars: [],
          favoriteProducts: [],
          currentShop: {},
          products: {
            filterIndex: null,
            sortIndex: 0,
            productsList: [],
          },
          order: {},
          orderHistory: [],
          pagination: {},
          loading: false,
          error: null,
        };
      } else {
        initialState = {
          user: {
            // id,
            email,
            // fullName,
          },
          searchResults: [],
          myList: [],
          // myList,
          shops,
          shoppingCar: {
            count: 0,
            total: 0,
            shop: '',
            products: [],
          },
          savedShoppingCars: [],
          favoriteProducts: [],
          products: {
            filterIndex: null,
            sortIndex: 0,
            productsList: [],
          },
          currentShop: {},
          order: {},
          orderHistory: [],
          pagination: {},
          loading: false,
          error: null,
        };
      }
    } catch (error) {
      initialState = {
        user: {},
        searchResults: [],
        myList: [],
        shops: [],
        shoppingCar: {
          count: 0,
          total: 0,
          shop: '',
          products: [],
        },
        savedShoppingCars: [],
        favoriteProducts: [],
        products: {
          filterIndex: null,
          sortIndex: 0,
          productsList: [],
        },
        currentShop: {},
        order: {},
        orderHistory: [],
        pagination: {},
        loading: false,
        error: null,
      };
      console.log(
        `ERROR CON EL INITIAL STATE (NO HAY USUARIO LOGEADO):\n${error}`
      );
    }

    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const isLogged = initialState.user.email;
    // const isLogged = initialState.user.id;

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
