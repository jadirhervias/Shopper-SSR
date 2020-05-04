import React from 'react';
import ReactDOM from 'react-dom';
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

  // para habilitar debugging de redux en el navegador
  const componseEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // se modificará cada vez cuando se hace connect() al final de cada componente
  const store = createStore(
    reducer,
    preloadedState,
    componseEnhancers(applyMiddleware(thunk))
  );

  // para no exponer los datos de la app al usuario
  delete window.__PRELOADED_STATE__;

  ReactDOM.hydrate(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}
