/* eslint-disable consistent-return */
import fs from 'fs';
import { config } from './config/index';

const getManifest = () => {
  try {
    if (!config.dev) {
      return JSON.parse(
        fs.readFileSync(`${__dirname}/public/manifest.json`, 'utf8')
      );
      // Adding gcm_sender_id to enable push notifications in all browsers
      // manifest = {
      //   ...manifest,
      //   gcm_sender_id: '103953800507'
      // }
      // return manifest;
    }
  } catch (error) {
    console.log('ERROR OBTENIENDO EL MANIFEST');
    console.log(error);
  }
};

export default getManifest;
