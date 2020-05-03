/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
import {
  SET_FAVORITE_CATALOG,
  REMOVE_FAVORITE_CATALOG,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  SEARCH_REQUEST,
} from '../types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_FAVORITE_CATALOG:
      return {
        ...state,
        // myList: [...state.myList, action.payload],
        // Para no agregar repetidos a la lista
        myList: state.myList.some((items) => items.id === action.payload.id)
          ? [...state.myList]
          : [...state.myList, action.payload],
      };

    case REMOVE_FAVORITE_CATALOG:
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload),
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        user: action.payload,
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        user: action.payload,
      };

    case SEARCH_REQUEST:
      console.log(`PAYLOAD EN EL REDUCER: ${JSON.stringify(action.payload)}`);
      return {
        ...state,
        // searchResults: action.payload && action.payload.searching.length - 1 !== 0 ?
        searchResults:
          action.payload && action.payload.searching.length !== 0
            ? state.catalogs.filter((item) =>
              item.name
                .toLowerCase()
                .includes(action.payload.searching.toLowerCase())
            )
            : [],
      };

    default:
      return state;
  }
};

export default reducer;
