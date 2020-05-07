/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import boom from '@hapi/boom';
import axios from 'axios';
import { config } from '../../../config/index';

passport.use(
  new BasicStrategy(async function (email, password, cb) {
    try {
      const { data, status } = await axios({
        // url: `${config.apiUrl}/${config.apiVersion}/auth/sign-in`,
        url: `${config.apiUrl}/login`,
        method: 'post',
        auth: {
          password,
          username: email,
        },
        data: {
          apiKeyToken: config.apiKeyToken,
        },
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, data);
    } catch (error) {
      console.log('ERROR MESSAGE: ', error.message);
      cb(error);
    }
  })
);
