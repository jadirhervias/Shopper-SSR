/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { registerRequest, setError } from '..';

// funcion para el llamado a la API (en actions con funciones dentro es donde actúa redux thunk)
export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios
      .post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data))) // delegar al action de registro original
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => dispatch(setError(error)));
  };
};
