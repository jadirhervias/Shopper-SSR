require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8000,
  apiUrl: process.env.API_URL,
  apiVersion: process.env.API_VERSION,
  apiKeyToken: process.env.API_KEY_TOKEN,
  googleApiKey: process.env.GOOGLE_API_KEY,
  culquiApi: process.env.CULQUI_API,
  culquiPublicKey: process.env.CULQUI_PUBLIC_KEY,
};

module.exports = { config };
