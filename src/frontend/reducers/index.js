/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
import { SET_FAVORITE_CATALOG, REMOVE_FAVORITE_CATALOG } from '../types';

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
    default:
      return state;
  }
};

export default reducer;
