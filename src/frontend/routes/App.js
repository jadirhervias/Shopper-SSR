/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../containers/Home';
import Shopping from '../containers/Shopping';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Layout from '../components/layout/Layout';
import ShoppingCarOrder from '../containers/ShoppingCarOrder';
import UserPanel from '../containers/UserPanel';
import Admin from '../containers/Admin';
import { messaging } from '../firebase/cloudMessaging';
import {
  pushNotification,
  dismissNotification,
} from '../components/notifications/pushNotification';
import {
  createUserDeviceGroup,
  setDeviceRegistrationId,
  setUserNotificationKeyAndKeyName,
} from '../actions/notificationActions';
// import logo from '../assets/static/shopper-logo.png';
import '../assets/styles/components/Notification.scss';
import { setNotificationDeviceId } from '../actions';

const App = ({ isLogged }) => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user);

  // Firebase Cloud Notification
  useEffect(() => {
    // Initialize notification container
    // window.createNotification = createNotification();

    // When closing notifications
    // window.dismissNotification = dismissNotification();
    window.dismissNotification = function () {
      const currentNotif = document.querySelector('.notif-front');
      const middleNotif = document.querySelector('.notif-middle');
      const lastNotif = document.querySelector('.notif-last');
      const notifOut = document.querySelectorAll('.notif-out');

      if (currentNotif) {
        currentNotif.classList.replace('notif-front', 'n');
        //Remove it after animating
        setTimeout(() => {
          currentNotif.remove();

          currentNotif ?
            middleNotif.classList.replace('notif-middle', 'notif-front') :
            '';
          middleNotif ?
            lastNotif.classList.replace('notif-last', 'notif-middle') :
            '';
          lastNotif ? notifOut.classList.replace('notif-out', 'n') : '';
        }, 300);
      }
    };

    // Attach this function to the `window` object
    window.initFirebaseMessaging = function () {
      messaging
        .requestPermission()
        .then(() => {
          console.log('Have permission');
          const deviceToken = messaging.getToken();
          return deviceToken;
        })
        .then((token) => {
          if (token) {
            console.log(token);
            dispatch(setDeviceRegistrationId(token));

            if (
              isLogged &&
              !userLogged.notificationKeyName &&
              !userLogged.notificationKey
            ) {
              dispatch(createUserDeviceGroup(token, userLogged.id));
            }

            // guardar token
          } else {
            console.log('No hay token');
            // anular token
          }
        })
        .catch((err) => {
          console.log('No se obtuvo permisos');
          // Feedback UI
          console.log(`Error${err}`);
        });

      messaging.onMessage((payload) => {
        console.log('onMessage: ', payload);
        pushNotification({
          text: payload.notification.body,
          icon: 'information-circle',
          close: true,
          type: 'info',
        });
      });
    };

    window.initFirebaseMessaging();

    // navigator.serviceWorker.addEventListener('message', (message) => console.log(message));
  }, []);

  return (
    // Encapsula los componentes que se necesitan y sus rutas
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={!isLogged ? Login : Home} />
          <Route
            exact
            path="/registrar"
            component={!isLogged ? Register : Home}
          />
          {/* <Route exact path="/comprar" component={Form} /> */}
          <Route
            exact
            path="/productos"
            component={isLogged ? Shopping : Login}
          />
          <Route
            exact
            path="/carrito"
            component={isLogged ? ShoppingCarOrder : Login}
          />
          <Route exact path="/user" component={isLogged ? UserPanel : Login} />
          <Route exact path="/admin" component={isLogged ? Admin : Login} />
          {/* <Route exact path="/comprar" component={isLogged ? Compra : Login} /> */}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
