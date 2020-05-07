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
  SET_ERROR,
} from '../types';

export const setFavoriteShop = (payload) => ({
  type: SET_FAVORITE_SHOP,
  payload,
});

export const removeFavoriteShop = (payload) => ({
  type: REMOVE_FAVORITE_SHOP,
  payload,
});

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

export const searchRequest = (payload) => ({
  type: SEARCH_REQUEST,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});
