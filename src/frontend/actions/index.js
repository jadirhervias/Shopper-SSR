/* eslint-disable import/prefer-default-export */
/* eslint-disable no-multi-assign */
// payload: es la información que estamos mandando al reducer.

// Crear action que describen lo que se hará como respuesta a un evento.
// Así pasar un objeto que se tendrá disponible en el reducer y luego alterará el store(estado)
import { SET_FAVORITE_CATALOG, REMOVE_FAVORITE_CATALOG } from '../types';

export const setFavoriteCatalog = (payload) => ({
  type: SET_FAVORITE_CATALOG,
  payload,
});

export const removeFavoriteCatalog = (payload) => ({
  type: REMOVE_FAVORITE_CATALOG,
  payload,
});
