/* eslint-disable consistent-return */
import passport from 'passport';
import boom from '@hapi/boom';
import axios from 'axios';
import { config } from './config';

//  Basic strategy
import './utils/auth/strategies/basic';

function api(app) {
  app.post('/login', async function (req, res, next) {
    passport.authenticate('basic', function (error, data) {
      try {
        if (error || !data) {
          console.log(`DATA DEL LOGIN (POR ESO EL ERROR): ${data}`);
          console.log(`EL ERROR: ${error}`);
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

  // ---------------------------------------------------------------

  // Agregar tiendas favoritas del usuario en sesión
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

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      delete data.links;
      delete data.page;

      return res.status(status).json(data.content);
    } catch (error) {
      next(error);
    }
  });

  // Obtener contenido de una tienda
  app.get('/shops/:id', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { id } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/shops/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
      });

      if (status !== 200 && status !== 201) {
        return next(boom.unauthorized);
      }

      delete data.links;
      data.page && delete data.page;

      // JSON + HAL
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Categorías de la tienda
  app.get('/shops/:id/categories', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { id } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/api/${config.apiVersion}/shops/${id}/categories`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      delete data.links;
      data.page && delete data.page;

      // JSON + HAL
      return res.status(200).json(data._embedded);
    } catch (error) {
      next(error);
    }
  });

  // Productos de la tienda por categoría
  app.get('/categories/:id/products', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { id } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/api/${config.apiVersion}/categories/${id}/products`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      delete data.links;

      // JSON + HAL
      return res.status(200).json(data.content.value);
    } catch (error) {
      next(error);
    }
  });

  // Productos de la tienda por sub-categoría
  app.get('/subcategories/:id', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { id } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/subcategories/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      // JSON + HAL
      return res.status(200).json(data.products);
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
}

export default api;
