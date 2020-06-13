/* eslint-disable no-unused-vars */
import axios from 'axios';
import { setHistoryOrder, setError, saveCard } from './index';

export const validateTokenCard = (card) => {
  return async (dispatch) => {
    try {
      const { data, status } = await axios({
        url: '/tokencard',
        method: 'POST',
        data: card,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const payOrder = (orderDetails) => {
  return async (dispatch) => {
    try {
      const { data, status } = await axios({
        url: '/tokencard',
        method: 'POST',
        data: orderDetails,
      });
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const saveUserCard = (card, userId) => {
  return async (dispatch) => {
    console.log(card);

    try {
      const { data, status } = await axios({
        url: `/newcard/${userId}`,
        method: 'POST',
        data: card,
      });

      dispatch(saveCard(card));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

// export const setOrder = (order) => {
//   return async (dispatch) => {
//     try {
//       const { data, status } = await axios({
//         url: '/order',
//         method: 'POST',
//         data: order
//       });

//       dispatch(setHistoryOrder(data));

//     } catch (error) {
//       console.log(error);
//       dispatch(setError(error));
//     }
//   };
// };
