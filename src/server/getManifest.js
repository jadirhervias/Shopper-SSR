import fs from 'fs';
import { config } from './config/index';

// eslint-disable-next-line consistent-return
const getManifest = () => {
  try {
    if (!config.dev) {
      return JSON.parse(
        fs.readFileSync(`${__dirname}/public/manifest.json`, 'utf8')
      );
    }
  } catch (error) {
    console.log('ERROR OBTENIENDO EL MANIFEST');
    console.log(error);
  }
};

export default getManifest;
