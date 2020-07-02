/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
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
  ADD_TO_CAR,
  REMOVE_OF_CAR,
  FILTER_BRANDS,
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

const reducer = (state, action) => {
  switch (action.type) {
    // SHOPS
    case SET_FAVORITE_SHOP:
      return {
        ...state,
        // Para no agregar repetidos a la lista
        myList: state.myList.some((items) => items.id === action.payload.id)
          ? [...state.myList]
          : [...state.myList, action.payload],
      };

    case REMOVE_FAVORITE_SHOP:
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload),
      };

    // AUTH
    // aprovechar el login para setear las listas preferidas del usuario en sesión
    case LOGIN_REQUEST:
      return {
        ...state,
        user: action.payload.user,
        // myList: action.payload.myList,
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

    // SEARCH
    case SEARCH_REQUEST:
      return {
        ...state,
        // searchResults: action.payload && action.payload.searching.length - 1 !== 0 ?
        searchResults:
          action.payload && action.payload.searching.length !== 0
            ? state.shops.filter((item) =>
              item.name
                .toLowerCase()
                .includes(action.payload.searching.toLowerCase())
            )
            : [],
      };

    // SHOPPING
    case SHOW_PRODUCTS_BY_SHOP:
      return {
        ...state,
        currentShop: action.payload,
      };

    case SHOW_PRODUCTS_BY_SUBCATEGORY:
      return {
        ...state,
        products: {
          ...state.products,
          productsList: action.payload,
        },
      };

    case FILTER_BRANDS:
      return {
        ...state,
        products: {
          ...state.products,
          filterIndex: action.payload,
        },
      };

    case ADD_TO_CAR:
      return {
        ...state,
        shoppingCar: action.payload,
      };

    case REMOVE_OF_CAR:
      return {
        ...state,
        shoppingCar: action.payload,
      };

    case SORT_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          sortIndex: action.payload,
        },
      };

    // PAY
    case SET_HISTORY_ORDER:
      return {
        ...state,
        orderHistory: action.payload,
      };

    case SAVE_CARD:
      return {
        ...state,
        userCards: action.payload,
      };

    // SHOW
    case SHOW_USER_ORDERS:
      return {
        ...state,
        showUserOrders: action.payload,
      };

    case SHOW_USER_SHOPPING_CARS:
      return {
        ...state,
        showUserShoppingCars: action.payload,
      };

    case SHOW_USER_CARDS:
      return {
        ...state,
        showUserCards: action.payload,
      };

    case SHOW_USER_ACCOUNT:
      return {
        ...state,
        showUserAccount: action.payload,
      };

    // DO ORDER
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    // FIREBASE NOTIFICATIONS
    case SET_NOTIFICATION_DEVICE_ID:
      return {
        ...state,
        user: {
          ...state.user,
          notificationDeviceId: action.payload,
        },
      };

    case SET_NOTIFICATION_KEY_AND_KEY_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          notificationKey: action.payload.notificationKey,
          notificationKeyName: action.payload.notificationKeyName,
        },
      };

    case ENABLE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case DISABLE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
