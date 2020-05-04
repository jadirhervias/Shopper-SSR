/* eslint-disable no-unused-vars */
/* eslint-disable import/imports-first */
/* eslint-disable import/order */
/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
import helmet from 'helmet';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import getManifest from './getManifest';
import api from './proxy';
import { config } from './config';
import main from './routes/main';

const app = express();

// Body parser
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

if (config.dev === true) {
  console.log(`\n${chalk.blueBright.bold('> Development config')}`);
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: config.port, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  const mode = config.env;
  console.log(`\n${chalk.magentaBright.bold(`> Loading ${mode} mode`)}`);

  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });

  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  // Para que el cliente web no obtenga info desde que servidor se conecta
  //   app.disable('X-Powered-By');
  app.disable('x-powered-by');
}

//Routes
app.get('*', main);
// app.get('/home', main);
api(app);

app.listen(config.port, (err) => {
  if (err) console.log(`\n${chalk.red('[fatal error]')} ${err.message}`);
  else {
    console.log(
      `${chalk.cyanBright(
        '[mecanica-ssr]'
      )} Server listening on http://localhost:${config.port}`
    );
  }
});