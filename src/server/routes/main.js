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
    const {
      email,
      id,
      notificationKey,
      notificationKeyName,
      notificationDeviceId,
      firstName,
      lastName,
      address,
      phoneNumber,
      lat,
      lng,
      token,
    } = req.cookies;

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
      const userCards = [
        {
          id: 'f2in329fjf91fn9jr1',
          card_number: '4111111111111111',
          cvv: '123',
          expiration_month: '09',
          expiration_year: '2020',
          email: 'jadir@gmail.com',
        },
        {
          id: 'f2in329fjf91fn9ko1',
          card_number: '5111111111111118',
          cvv: '039',
          expiration_month: '09',
          expiration_year: '2025',
          email: 'jadir@gmail.com',
        },
      ].map((item) => ({
        ...item,
        card_number: '************'.concat(item.card_number.substring(7, 11)),
      }));

      const savedShoppingCars = [
        {
          id: 'dnn1nd90723fn8f0193f',
          name: 'Fiesta',
          count: 2,
          total: 5.5,
          // Unicachi
          shop: '5ed96b57f0a4636596224a28',
          products: [
            {
              id: '5ea63708c97be35753f9d934',
              name: 'Pinguinos de Marinela',
              details: 'panecillos de chocolate con relleno de merengue',
              cost: 5,
              format: '2 unidades por paquete',
              brand: 'Marinela',
              stock: 88,
              last_update: '2020-04-26T20:00:00.000+00:00',
              quantity: 1,
            },
            {
              id: '5ea639a2820f2d4fb97a619a',
              name: 'cua cua',
              details: 'wafer bañado en chocolate',
              cost: 0.5,
              format: '1 barra por unidad',
              brand: 'Field',
              stock: 88,
              last_update: '2020-04-26T20:45:00.000+00:00',
              quantity: 1,
            },
          ],
        },
        {
          id: 'dmvp1390723fn8f0193f',
          name: 'Domingo familiar',
          count: 2,
          total: 5.5,
          // Unicachi
          shop: '5ed96b57f0a4636596224a28',
          products: [
            {
              id: '5ea63708c97be35753f9d934',
              name: 'Pinguinos de Marinela',
              details: 'panecillos de chocolate con relleno de merengue',
              cost: 5,
              format: '2 unidades por paquete',
              brand: 'Marinela',
              stock: 88,
              last_update: '2020-04-26T20:00:00.000+00:00',
              quantity: 1,
            },
            {
              id: '5ea639a2820f2d4fb97a619a',
              name: 'cua cua',
              details: 'wafer bañado en chocolate',
              cost: 0.5,
              format: '1 barra por unidad',
              brand: 'Field',
              stock: 88,
              last_update: '2020-04-26T20:45:00.000+00:00',
              quantity: 1,
            },
          ],
        },
      ];

      if (!email || !id) {
        initialState = {
          user: {
            notificationDeviceId: null,
            notificationKey: null,
            notificationKeyName: null,
          },
          userCards: [],
          searchResults: [],
          myList: [],
          shops,
          shoppingCar: {
            count: 0,
            products: [],
            totalCost: 0,
          },
          savedShoppingCars: [],
          // favoriteProducts: [],
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
          showUserCards: false,
          showUserOrders: false,
          showUserShoppingCars: false,
          showUserAccount: false,
        };
      } else {
        initialState = {
          user: {
            id,
            email,
            firstName,
            lastName,
            address,
            phoneNumber,
            lat,
            lng,
            notificationKey,
            notificationKeyName,
            notificationDeviceId,
          },
          userCards,
          searchResults: [],
          myList: [shops[0], shops[2]],
          // myList,
          shops,
          shoppingCar: {
            count: 0,
            products: [],
            totalCost: 0,
          },
          savedShoppingCars,
          // favoriteProducts: [],
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
          showUserCards: false,
          showUserOrders: false,
          showUserShoppingCars: false,
          showUserAccount: false,
        };
      }
    } catch (error) {
      initialState = {
        user: {
          notificationDeviceId: null,
          notificationKey: null,
          notificationKeyName: null,
        },
        userCards: [],
        searchResults: [],
        myList: [],
        shops: [],
        shoppingCar: {
          count: 0,
          products: [],
          totalCost: 0,
        },
        savedShoppingCars: [],
        // favoriteProducts: [],
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
        showUserCards: false,
        showUserOrders: false,
        showUserShoppingCars: false,
        showUserAccount: false,
      };
      console.log(
        `ERROR CON EL INITIAL STATE (NO HAY USUARIO LOGEADO):\n${error}`
      );
    }

    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const isLogged = initialState.user.email && initialState.user.id;

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
