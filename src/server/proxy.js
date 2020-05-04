/* eslint-disable consistent-return */
// import passport from 'passport';
import boom from '@hapi/boom';
import axios from 'axios';
import { config } from './config';

//  Basic strategy
import './utils/auth/strategies/basic';

function api(app) {
  // app.post('/auth/sign-in', async function (req, res, next) {
  //   passport.authenticate('basic', function (error, data) {
  //     try {
  //       if (error || !data) {
  //         // data es undefined
  //         // next(boom.unauthorized());
  //         return res.status(401).json({
  //           statusCode: 401,
  //           error: 'Unauthorized',
  //           message: 'Email y/o constraseña incorrectos',
  //         });
  //       }
  //       req.login(data, { session: false }, async function (error) {
  //         if (error) {
  //           console.log(error);
  //           next(error);
  //           // return;
  //         }

  //         const { token, ...user } = data;

  //         // Para despliegue
  //         res.clearCookie('token');
  //         res.cookie('token', token, {
  //           httpOnly: config.dev,
  //           // httpOnly: !config.dev,
  //           secure: config.dev,
  //           // secure: !config.dev,
  //           // domain: 'mecanicatecsup-demo.com'
  //         });

  //         return res.status(200).json(user.user);
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   })(req, res, next);
  // });

  app.post('/auth/sign-up', async function (req, res, next) {
    const { user } = req.body;

    try {
      const userData = await axios({
        url: `${config.apiUrl}/${config.apiVersion}/auth/sign-up`,
        method: 'post',
        data: user,
      });

      res.status(201).json({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        id: userData.data.id,
      });
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
  app.get('/products', async function (req, res, next) {
    try {
      const { data, status } = await axios({
        url: `${config.apiUrl}/${config.apiVersion}/products`,
        // headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });

      if (status !== 200) {
        return next(boom.badImplementation());
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
}

export default api;
