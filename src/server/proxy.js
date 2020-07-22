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
          console.log(data);

          const { token, ...user } = data;

          // Limpiar la cookie anterior
          res.clearCookie('token');

          console.log(config.dev);

          // Setear la nueva cookie
          res.cookie('token', token, {
            httpOnly: config.dev,
            secure: !config.dev,
            // domain: 'shopper-demo.com'
          });

          console.log(user);

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
        url: `${config.apiUrl}/users/sign-up`,
        method: 'post',
        data: req.body,
      });

      res.status(201).json({
        id: data.id,
        email: data.email,
        role: data.role,
        address: data.address,
        firstName: data.first_name,
        lastName: data.last_name,
        phoneNumber: data.phone_number,
        userLat: data.user_lat,
        userLng: data.user_lng,
        notificationDeviceGroup: data.notification_device_group,
        fullName: `${data.first_name} ${data.last_name}`,
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

  // Obtener tiendas mas cercanas al usuario
  app.get('/nearest-shops', async (req, res, next) => {
    try {
      const { token } = req.cookies;

      const { data, status } = await axios({
        url: `${config.apiUrl}/shops/sorted`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
        data: req.body,
      });

      if (status !== 200 && status !== 201) {
        return next(boom.unauthorized);
      }

      // Array
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
  app.get('/subcategories/:id/:page', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { id, page } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/subcategories/${id}/pagination?page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      // JSON + HAL
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Obtener autorizacion para cargo con tarjeta del usuario
  app.post('/verify-card', async (req, res, next) => {
    try {
      const card = req.body;

      const { data, status } = await axios({
        url: config.culquiApi,
        headers: {
          Authorization: `Bearer ${config.culquiPublicKey}`,
        },
        method: 'POST',
        data: card,
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      // data.id -> token
      return res.status(200).json(data.id);
    } catch (error) {
      next(error);
    }
  });

  // Hacer el pedido
  app.post('/orders', async (req, res, next) => {
    try {
      console.log(req.body);
      const { token } = req.cookies;

      const { data, status } = await axios({
        url: `${config.apiUrl}/orders`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        data: req.body,
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Obtener historico de ordenes del usuario
  app.get('/orders-list/:userId/:page', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { userId, page } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/orders/${userId}/pagination?page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      // JSON + HAL
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Crear grupo de dispositivos del usuario para recibir notificaciones
  app.post('/create-device-group', async (req, res, next) => {
    try {
      const { token } = req.cookies;

      const { data, status } = await axios({
        url: `${config.apiUrl}/user-notification`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        data: req.body,
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Agregar token de dispositivo del usuario para recibir notificaciones
  app.post('/add-device/:userId', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { userId } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/user-notification/${userId}/add`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        data: req.body,
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Remover token de dispositivo del usuario para ya no recibir notificaciones
  app.post('/remove-device/:userId', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { userId } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/user-notification/${userId}/remove`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        data: req.body,
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Guardar carrito de un usuario
  app.post('/user/shopping-cars/:userId', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { userId } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/users/shopping-cars/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        data: req.body,
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Guardar carrito de un usuario
  app.get('/user/shopping-cars/:userId/:page', async (req, res, next) => {
    try {
      const { token } = req.cookies;
      const { userId, page } = req.params;

      const { data, status } = await axios({
        url: `${config.apiUrl}/users/shopping-cars/${userId}/pagination?page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });

      if (status !== 200 && status !== 201) {
        return next(boom.badImplementation());
      }

      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Guardar carrito de un usuario
  app.get(
    '/search-products/:subcategoryId/:productChain',
    async (req, res, next) => {
      try {
        const { token } = req.cookies;
        const { subcategoryId, productChain } = req.params;

        const { data, status } = await axios({
          url: `${config.apiUrl}/subcategories/search/products/${subcategoryId}/${productChain}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'GET',
        });

        if (status !== 200 && status !== 201) {
          return next(boom.badImplementation());
        }

        return res.status(201).json(data);
      } catch (error) {
        next(error);
      }
    }
  );

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
