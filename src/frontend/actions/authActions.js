/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  addRegistrationDeviceId,
  removeRegistrationDeviceId,
} from './notificationActions';
import {
  registerRequest,
  setError,
  loginRequest,
  setNotificationKeyAndKeyName,
  logoutRequest,
} from '.';

// funcion para el llamado a la API (en actions con funciones dentro es donde actúa redux thunk)
export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    // axios
    //   .post('/sign-up', payload)    // props.addRegistrationDeviceId(user.registrationDeviceId, user.id);

    axios({
      url: '/sign-up',
      method: 'post',
      data: payload,
    })
      .then(({ data }) => {
        console.log('REGISTER EXITOSO');
        dispatch(registerRequest(data));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => {
        console.log(`ERROR AL REGISTRARSE: ${error}`);
        dispatch(setError(error));
      });
    // .then(({ status }) => {

    //   console.log(`STATUS REGISTER: ${ status}`);

    //   const { email, password } = payload;

    //   console.log('login creds:');
    //   console.log(email);
    //   console.log(password);

    //   axios({
    //     url: '/login',
    //     method: 'post',
    //     auth: {
    //       username: email,
    //       password,
    //     },
    //   })
    //     .then(({ data }) => {
    //       console.log('REGISTER->LOGIN DATA:');
    //       console.log(data);

    //       document.cookie = `id=${data.user.id}`;
    //       document.cookie = `firstName=${data.user.first_name}`;
    //       document.cookie = `lastName=${data.user.last_name}`;
    //       document.cookie = `phoneNumber=${data.user.phone_number}`;
    //       document.cookie = `address=${data.user.addres}`;
    //       document.cookie = `lat=${data.user.user_lat}`;
    //       document.cookie = `lng=${data.user.user_lng}`;
    //       document.cookie = `email=${data.user.email}`;

    //       dispatch(loginRequest(data));
    //     // dispatch(registerRequest(data))
    //     })
    //     .then(() => {
    //       window.location.href = redirectUrl;
    //     })
    //     .catch((error) => {
    //       console.log(`ERROR AL LOGEARSE: ${error}`);
    //       dispatch(setError(error));
    //     });
    // }) // delegar al action de registro original
  };
};

export const loginUser = (
  { email, password },
  redirectUrl,
  registrationDeviceId
) => {
  return (dispatch) => {
    axios({
      url: '/login',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => {
        console.log('LOGIN DATA:');
        console.log(data);

        document.cookie = `id=${data.user.id}`;
        document.cookie = `firstName=${data.user.first_name}`;
        document.cookie = `lastName=${data.user.last_name}`;
        document.cookie = `phoneNumber=${data.user.phone_number}`;
        document.cookie = `address=${data.user.addres}`;
        document.cookie = `lat=${data.user.user_lat}`;
        document.cookie = `lng=${data.user.user_lng}`;
        document.cookie = `email=${data.user.email}`;
        if (data.user.notification) {
          document.cookie = `notificationKeyName=${data.user.notification.notification_key_name}`;
          document.cookie = `notificationKey=${data.user.notification.notification_key}`;
          dispatch(setNotificationKeyAndKeyName(data.user.notification));
        }

        dispatch(addRegistrationDeviceId(registrationDeviceId, data.user.id));

        dispatch(loginRequest(data));

        console.log('LOGIN EXITOSO');
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => {
        console.log(`ERROR AL LOGEARSE: ${error}`);
        dispatch(setError(error));
      });
  };
};

export const logoutUser = (redirectUrl, deviceId, userId) => {
  return async (dispatch) => {
    try {
      dispatch(removeRegistrationDeviceId(deviceId, userId));

      // vaciar los datos del usuario
      document.cookie = 'id=';
      document.cookie = 'token=';
      document.cookie = 'email=';
      document.cookie = 'fullName=';
      document.cookie = 'firstName=';
      document.cookie = 'lastName=';
      document.cookie = 'phoneNumber=';
      document.cookie = 'address=';
      document.cookie = 'lat=';
      document.cookie = 'lng=';
      document.cookie = 'notificationKeyName=';
      document.cookie = 'notificationKey=';

      dispatch(logoutRequest({}));

      localStorage.removeItem('state');

      window.location.href = redirectUrl;
    } catch {
      console.log(`ERROR AL HACER LOGOUT: ${error}`);
      dispatch(setError(error));
    }
  };
};

export const favoriteShop = (userId, shop, cb) => (dispatch) => {
  axios({
    url: '/users/shops',
    method: 'post',
    data: {
      user_id: userId,
      shop_id: shop.id,
    },
  })
    .then(({ data }) => {
      const {
        data: { shopExist },
      } = data;

      const message = shopExist
        ? `${shop.title} ya está en tus favoritos`
        : `${shop.title} fue agregada a tus favoritos`;

      !shopExist && dispatch(setFavorite(shop));

      cb(shopExist, message);
    })
    .catch((err) => dispatch(setError(err)));
};
