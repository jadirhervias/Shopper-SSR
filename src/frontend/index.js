/* eslint-disable no-native-reassign */
/* eslint-disable no-global-assign */
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import reducer from './reducers';
import App from './routes/App';
import FirebaseProvider from './firebase/firebaseInit';
import { saveState, loadState } from './utils/localStorage';

window === 'undefined' && {};

if (typeof window !== 'undefined') {
  console.log(window);
  console.log(typeof window);

  const history = createBrowserHistory();
  const preloadedState = loadState() || window.__PRELOADED_STATE__;

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

  store.subscribe(function () {
    saveState(store.getState());
  });

  // para no exponer los datos de la app al usuario
  delete window.__PRELOADED_STATE__;

  hydrate(
    // Provider: Permite encapsular nuestros componente por medio de un connect,
    // para poder transmitir toda la informacion del STORE(estado) a todos los componentes dentro
    <Provider store={store}>
      <FirebaseProvider>
        <Router history={history}>
          <App isLogged={preloadedState.user.email && preloadedState.user.id} />
        </Router>
      </FirebaseProvider>
    </Provider>,
    document.getElementById('root')
  );
}
