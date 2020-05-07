/* eslint-disable consistent-return */
import passport from 'passport';
import boom from '@hapi/boom';
import axios from 'axios';
import { config } from './config';

//  Basic strategy
import './utils/auth/strategies/basic';

function api(app) {
  // app.post('/auth/sign-in', async function (req, res, next) {
  app.post('/login', async function (req, res, next) {
    passport.authenticate('basic', function (error, data) {
      try {
        if (error || !data) {
          console.log(`DATA DEL LOGIN (POR ESO EL ERROR): ${data}`);
          console.log(`EL ERROR: ${error}`);
          // data es undefined
          next(boom.unauthorized());
          // return res.status(401).json({
          //   statusCode: 401,
          //   error: 'Unauthorized',
          //   message: 'Email y/o constraseña incorrectos',
          // });
        }
        req.login(data, { session: false }, async function (err) {
          if (err) {
            console.log(err);
            next(err);
            // return;
          }

          const { token, ...user } = data;

          // Limpiar la cookie anterior
          res.clearCookie('token');

          // Setear la nueva cookie
          res.cookie('token', token, {
            // httpOnly: config.dev,
            httpOnly: !config.dev,
            // secure: config.dev,
            secure: !config.dev,
            // domain: 'shopper-demo.com'
          });

          return res.status(200).json(user);
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  // ---------------------------------------------------------------

  // app.post('/auth/sign-up', async function (req, res, next) {

  app.post('/sign-up', async function (req, res, next) {
    try {
      const { data } = await axios({
        // url: `${config.apiUrl}/${config.apiVersion}/auth/sign-up`,
        url: `${config.apiUrl}/sign-up`,
        method: 'post',
        data: req.body,
      });

      res.status(201).json({
        id: data.user.id,
        email: data.user.email,
        fullName: `${data.user.first_name} ${data.user.last_name}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  // Agregar tiendas favoritas del usuario en sesión
  // app.post('/user/shops', async (req, res, next) => {
  app.post('/shops', async (req, res, next) => {
    try {
      const { token } = req.cookies;

      const { data, status } = await axios({
        // url: `${config.apiUrl}/${config.apiVersion}/user/shops`,
        url: `${config.apiUrl}/shops`,
        // Tipo Bearer
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'post',
        data: req.body,
      });

      const {
        data: { shopExist },
      } = data;

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      const statusCode = shopExist ? 200 : 201;

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  });

  // // Para verificar si el token expiró
  // app.get('/verify/:user', async function (req, res, next) {
  //   try {
  //     const { token } = req.cookies;
  //     const { user } = req.params;

  //     const { data, status } = await axios({
  //       url: `${config.apiUrl}/api/${config.apiVersion}/evaluations/verify/${user}`,
  //       headers: { Authorization: `Bearer ${token}` },
  //       method: 'get',
  //     });

  //     if (status !== 200) {
  //       console.log('ERROR OBTENIDO DEL API: ', status);
  //       return next(boom.badImplementation());
  //     }
  //     // data.data : array objetos con info de cada evaluación del docente en sesión
  //     // data.message
  //     res.status(200).json(data);
  //   } catch (error) {
  //     if (
  //       error.response.status === 401 ||
  //       error.response.status === 403 ||
  //       error.response.status === 419
  //     ) {
  //       res.status(error.response.status).json({
  //         status: error.response.status,
  //         // message: error.response.statusText
  //         valid_token: false,
  //       });
  //     } else {
  //       next(error);
  //     }
  //   }
  // });

  // Para listar productos
  // app.get('/products', async function (req, res, next) {
  //   try {
  //     const { data, status } = await axios({
  //       url: `${config.apiUrl}/${config.apiVersion}/products`,
  //       // headers: { Authorization: `Bearer ${token}` },
  //       method: 'get',
  //     });

  //     if (status !== 200) {
  //       return next(boom.badImplementation());
  //     }

  //     res.status(200).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // });
}

export default api;
