// payload: es la información que estamos mandando al reducer.

// Crear action que describen lo que se hará como respuesta a un evento.
// Así pasar un objeto que se tendrá disponible en el reducer y luego alterará el store(estado)

import {
  SET_FAVORITE_SHOP,
  REMOVE_FAVORITE_SHOP,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  SEARCH_REQUEST,
  SHOW_PRODUCTS_BY_SHOP,
  SHOW_PRODUCTS_BY_CATEGORY,
  SHOW_PRODUCTS_BY_SUBCATEGORY,
  FILTER_BRANDS,
  SET_ERROR,
  ADD_TO_CAR,
  REMOVE_OF_CAR,
  SORT_PRODUCTS,
} from '../types';

// AUTH

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const logoutRequest = (payload) => ({
  type: LOGOUT_REQUEST,
  payload,
});

export const registerRequest = (payload) => ({
  type: REGISTER_REQUEST,
  payload,
});

// HOME

export const setFavoriteShop = (payload) => ({
  type: SET_FAVORITE_SHOP,
  payload,
});

export const removeFavoriteShop = (payload) => ({
  type: REMOVE_FAVORITE_SHOP,
  payload,
});

// SEARCH

export const searchRequest = (payload) => ({
  type: SEARCH_REQUEST,
  payload,
});

// SHOPPING

export const showProductsByShop = (payload) => ({
  type: SHOW_PRODUCTS_BY_SHOP,
  payload,
});

export const showProductsByCategory = (payload) => ({
  type: SHOW_PRODUCTS_BY_CATEGORY,
  payload,
});

export const showProductsBySubcategory = (payload) => ({
  type: SHOW_PRODUCTS_BY_SUBCATEGORY,
  payload,
});

export const addToCar = (payload) => ({
  type: ADD_TO_CAR,
  payload,
});

export const removeOfCar = (payload) => ({
  type: REMOVE_OF_CAR,
  payload,
});

export const filterProductsByBrand = (payload) => ({
  type: FILTER_BRANDS,
  payload,
});

export const sortProducts = (payload) => ({
  type: SORT_PRODUCTS,
  payload,
});

// ERROR
export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});
