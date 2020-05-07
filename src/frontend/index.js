import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import reducer from './reducers';
import App from './routes/App';

if (typeof window !== 'undefined') {
  const history = createBrowserHistory();
  const preloadedState = window.__PRELOADED_STATE__;

  // const composeEnhancers = (process.env.NODE_ENV === 'production') ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
  // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : para habilitar debugging de redux en el navegador

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // se modificará cada vez cuando se hace connect() al final de cada componente
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk))
  );

  // para no exponer los datos de la app al usuario
  delete window.__PRELOADED_STATE__;

  hydrate(
    <Provider store={store}>
      <Router history={history}>
        <App isLogged={preloadedState.user.id} />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}
