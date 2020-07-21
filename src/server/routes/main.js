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
    let initialState;
    const {
      email,
      id,
      notificationKey,
      notificationKeyName,
      registrationDeviceId,
      firstName,
      lastName,
      address,
      phoneNumber,
      lat,
      lng,
      token,
    } = req.cookies;

    try {
      const shopsData = await axios({
        url: `${config.apiUrl}/api/${config.apiVersion}/shops`,
        method: 'GET',
      });

      // Datos iniciales obtenidos de la API
      const shops = shopsData.data.content;
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

      if (!email || !id) {
        initialState = {
          user: {
            registrationDeviceId: null,
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
            subcategoryId: '',
            subcategoryName: '',
            filterIndex: null,
            sortIndex: 0,
            productsList: [],
          },
          order: {},
          orderCoordenates: {},
          orderHistory: [],
          pagination: {
            size: 0,
            last: false,
            first: true,
            empty: false,
            numberOfElements: 0,
            totalPages: 0,
            totalElements: 0,
            number: 0,
          },
          mapLoaded: false,
          loading: false,
          error: null,
          showUserCards: false,
          showUserOrders: false,
          showUserShoppingCars: false,
          showUserAccount: false,
        };
      } else {
        // const userShoppingCarsData = await axios({
        //   url: `${config.apiUrl}/users/shopping-cars/${id}/pagination`,
        //   method: 'GET',
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

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
            registrationDeviceId,
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
          savedShoppingCars: [],
          // savedShoppingCars: userShoppingCarsData.data.content,
          // favoriteProducts: [],
          products: {
            subcategoryId: '',
            subcategoryName: '',
            filterIndex: null,
            sortIndex: 0,
            productsList: [],
          },
          currentShop: {},
          order: {},
          orderCoordenates: {},
          orderHistory: [],
          pagination: {
            size: 0,
            last: false,
            first: true,
            empty: false,
            numberOfElements: 0,
            totalPages: 0,
            totalElements: 0,
            number: 0,
          },
          mapLoaded: false,
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
          registrationDeviceId: null,
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
          subcategoryId: '',
          subcategoryName: '',
          filterIndex: null,
          sortIndex: 0,
          productsList: [],
        },
        currentShop: {},
        order: {},
        orderCoordenates: {},
        orderHistory: [],
        pagination: {
          size: 0,
          last: false,
          first: true,
          empty: false,
          numberOfElements: 0,
          totalPages: 0,
          totalElements: 0,
          number: 0,
        },
        mapLoaded: false,
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

    console.log(req.url);

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
