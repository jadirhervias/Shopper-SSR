/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { registerRequest, setError, loginRequest } from '.';

// funcion para el llamado a la API (en actions con funciones dentro es donde actúa redux thunk)
export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios
      // .post('/auth/sign-up', payload)
      .post('/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data))) // delegar al action de registro original
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => dispatch(setError(error)));
  };
};

export const loginUser = ({ email, password }, redirectUrl) => {
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
        // const fullName = `${data.user['first_name']} ${data.user['last_name']}`;
        // const { myList } = data.user;

        // document.cookie = `id=${data.user.id}`;
        document.cookie = `email=${data.user.email}`;
        // document.cookie = `fullName=${data.user.full_name}`;
        // document.cookie = `fullName=${fullName}`;

        // delete data.user['first_name'];
        // delete data.user['last_name'];
        // delete data.user['myList'];

        // data.user['fullName'] = fullName;
        // data['myList'] = myList;

        // data.user y data.myList
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

      const message = shopExist ?
        `${shop.title} ya está en tus favoritos` :
        `${shop.title} fue agregada a tus favoritos`;

      !shopExist && dispatch(setFavorite(shop));

      cb(shopExist, message);
    })
    .catch((err) => dispatch(setError(err)));
};
