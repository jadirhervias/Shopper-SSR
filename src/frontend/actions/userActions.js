import {
  showUserOrders,
  showUserShoppingCars,
  showUserCards,
  showUserAccount,
} from './index';

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
