/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import Swal from 'sweetalert2';
import { setOrder, saveCard, setHistoryOrder, setError } from './index';

export const verifyAndPayOrder = (
  card,
  orderDetails,
  shoppingCar,
  comissionCost
) => {
  return async (dispatch) => {
    try {
      const { data, status } = await axios({
        url: '/verify-card',
        method: 'POST',
        data: card,
      });

      const cardAuthorizationId = data;

      if ((status === 200 || status === 201) && cardAuthorizationId) {
        $('#modalProcessPayment').modal('hide');

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
          total_cost: (shoppingCar.totalCost + comissionCost) * 100,
        };

        delete validOrder.customer.notificationDeviceId;
        delete validOrder.customer.notificationKeyName;
        delete validOrder.customer.notificationKey;

        shoppingCar.products.forEach((product) => {
          product.image = null;
          product.last_update = null;
        });
        validOrder.shopping_car = shoppingCar;
        delete validOrder.shopping_car.totalCost;
        validOrder.source_id = cardAuthorizationId;
        validOrder.fecha_compra = new Date().toISOString().slice(0, 10);

        let timerInterval;
        Swal.fire({
          title: 'Procesando orden',
          // html: 'I will close in <b></b> milliseconds.',
          // timer: 3500,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading();
            // timerInterval = setInterval(() => {
            //   const content = Swal.getContent()
            //   if (content) {
            //     const b = content.querySelector('b')
            //     if (b) {
            //       b.textContent = Swal.getTimerLeft()
            //     }
            //   }
            // }, 100)
          },
          onClose: () => {
            // clearInterval(timerInterval)
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
          }
        });

        const { data, status } = await axios({
          url: '/order',
          method: 'post',
          data: validOrder,
        });

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
