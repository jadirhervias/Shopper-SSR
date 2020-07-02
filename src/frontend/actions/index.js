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
  SET_HISTORY_ORDER,
  SAVE_CARD,
  SET_ORDER,
  SHOW_USER_ORDERS,
  SHOW_USER_SHOPPING_CARS,
  SHOW_USER_CARDS,
  SHOW_USER_ACCOUNT,
  SET_NOTIFICATION_DEVICE_ID,
  SET_NOTIFICATION_KEY_AND_KEY_NAME,
  ENABLE_LOADING,
  DISABLE_LOADING,
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

// PAY
export const setHistoryOrder = (payload) => ({
  type: SET_HISTORY_ORDER,
  payload,
});

export const saveCard = (payload) => ({
  type: SAVE_CARD,
  payload,
});

// SHOW
export const showUserOrders = (payload) => ({
  type: SHOW_USER_ORDERS,
  payload,
});

export const showUserShoppingCars = (payload) => ({
  type: SHOW_USER_SHOPPING_CARS,
  payload,
});

export const showUserCards = (payload) => ({
  type: SHOW_USER_CARDS,
  payload,
});

export const showUserAccount = (payload) => ({
  type: SHOW_USER_ACCOUNT,
  payload,
});

// ORDER PROCESS
export const setOrder = (payload) => ({
  type: SET_ORDER,
  payload,
});

// FIREBASE NOTIFICATIONS
export const setNotificationDeviceId = (payload) => ({
  type: SET_NOTIFICATION_DEVICE_ID,
  payload,
});

export const setNotificationKeyAndKeyName = (payload) => ({
  type: SET_NOTIFICATION_KEY_AND_KEY_NAME,
  payload,
});

// LOADING
export const showLoading = () => ({
  type: ENABLE_LOADING,
  payload: true,
});

export const hideLoading = () => ({
  type: DISABLE_LOADING,
  payload: false,
});

// ERROR
export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});
