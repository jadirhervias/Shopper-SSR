/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import {
  addToCar,
  removeOfCar,
  filterProductsByBrand,
  sortProducts,
} from './index';

export const addProductToCar = (product) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(addToCar(product));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const removeProductOfCar = (product) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(removeOfCar(product));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const filterProducts = (filter) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(filterProductsByBrand(filter));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const sortProductsAction = (orderIndex) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(sortProducts(orderIndex));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};
