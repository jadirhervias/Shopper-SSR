/* eslint-disable no-param-reassign */
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  showUserOrders,
  showUserShoppingCars,
  showUserCards,
  showUserAccount,
  setError,
  setHistoryOrder,
  showLoading,
  hideLoading,
} from './index';

export const showUserOrdersHistory = (userId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data } = await axios({
        url: `/orders-list/${userId}`,
        method: 'get',
      });

      dispatch(setHistoryOrder(data));
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const saveUserShoppingCar = (shoppingCar, userId) => {
  return async (dispatch) => {
    try {
      const { status } = await axios({
        url: `/user/shopping-cars/${userId}`,
        method: 'POST',
        data: shoppingCar,
      });

      if (status === 200 || status === 201) {
        $('#modalSaveShoppingCar').modal('hide');
        Swal.fire(
          'Tu carrito se guardó',
          'Puedes ver tus carritos de compra en la sección "Mi cuenta"',
          'success'
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo guardar tu carrito. Inténtalo nuevamente',
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

// export const updateUserShoppingCar = (show) => {
//   return async (dispatch) => {
//     try {
//       // state setup
//       dispatch(showUserOrders(show));
//     } catch (error) {
//       console.log(error);
//       dispatch(setError(error));
//     }
//   };
// };

// To show dinamic views according the state...

export const showUserOrdersAction = (show) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(showUserOrders(show));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const showUserShoppingCarsAction = (show) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(showUserShoppingCars(show));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const showUserCardsAction = (show) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(showUserCards(show));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const showUserAccountAction = (show) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(showUserAccount(show));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};
