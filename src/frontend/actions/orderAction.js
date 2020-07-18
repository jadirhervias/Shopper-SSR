/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  setOrder,
  saveCard,
  setHistoryOrder,
  setError,
  setOrderCoordenates,
} from './index';

export const verifyAndPayOrder = (
  card,
  orderDetails,
  shoppingCar,
  comissionCost,
  orderCoordenates
) => {
  return async (dispatch) => {
    try {
      const authorizationResponse = await axios({
        url: '/verify-card',
        method: 'POST',
        data: card,
      });

      const cardAuthorizationId = authorizationResponse.data;

      if (
        (authorizationResponse.status === 200 ||
          authorizationResponse.status === 201) &&
        cardAuthorizationId
      ) {
        $('#modalProcessPayment').modal('hide');

        Swal.fire({
          title: 'Procesando orden',
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
          }
        });

        const validCustomer = {
          id: orderDetails.customer.id,
          email: orderDetails.customer.email,
          first_name: orderDetails.customer.firstName,
          last_name: orderDetails.customer.lastName,
          phone_number: orderDetails.customer.phoneNumber,
          address: orderDetails.customer.address,
          user_lat: orderDetails.customer.lat,
          user_lng: orderDetails.customer.lng,
          notification_device_group: {
            notification_key_name: orderDetails.customer.notificationKeyName,
            notification_key: orderDetails.customer.notificationKey,
          },
        };

        const validOrder = {
          ...orderDetails,
          customer: validCustomer,
          coordenates: orderCoordenates,
          total_cost: (shoppingCar.totalCost + comissionCost) * 100,
        };

        delete validOrder.customer.notificationDeviceId;
        delete validOrder.customer.notificationKeyName;
        delete validOrder.customer.notificationKey;

        shoppingCar.products.forEach((product) => {
          // product.image = null;
          product.last_update = null;
        });
        validOrder.shopping_car = shoppingCar;
        delete validOrder.shopping_car.totalCost;
        validOrder.source_id = cardAuthorizationId;
        validOrder.fecha_compra = new Date().toISOString().slice(0, 10);

        const orderResponse = await axios({
          url: '/orders',
          method: 'post',
          data: validOrder,
        });

        if (orderResponse.status === 201) {
          dispatch(setOrder(orderResponse.data));
        }

        Swal.fire(
          'Pedido realizado correctamente',
          'Un shopper tomará tu pedido pronto',
          'success'
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo validar tu medio de pago. Inténtalo nuevamente',
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error));

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo validar tu medio de pago. Inténtalo nuevamente',
      });
    }
  };
};

export const validateTokenCard = (card) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: '/verify-card',
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
        url: '/order',
        method: 'POST',
        data: orderDetails,
      });
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const setOrderCoordenatesAction = (coordenates) => {
  return async (dispatch) => {
    try {
      dispatch(setOrderCoordenates(coordenates));
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

export const setCurrentOrder = (order) => {
  return async (dispatch) => {
    try {
      dispatch(setOrder(order));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};
