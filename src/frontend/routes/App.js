import React, { useEffect, useContext } from 'react';
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
import { pushNotification } from '../components/notifications/pushNotification';
import {
  createUserDeviceGroup,
  setUserRegistrationDeviceId,
} from '../actions/notificationActions';
import { FirebaseContext } from '../firebase/firebaseInit';
import { loadGoogleMap } from '../actions';
// import googleApiKey from '../credentials/googleApiKey';
import '../assets/styles/components/Notification.scss';

const App = ({ isLogged }) => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user);
  const { messaging } = useContext(FirebaseContext);

  // Init Google maps
  const initGoogleMaps = () => {
    const googleMapsDom = document.getElementById('googleMaps');
    if (!document.head.contains(googleMapsDom)) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
      script.id = 'googleMaps';
      script.defer = true;
      // script.async = true;

      googleMapsDom.addEventListener('load', function () {
        dispatch(loadGoogleMap(true));
      });

      document.head.appendChild(script);
    }
  };

  useEffect(() => {
    initGoogleMaps();

    // When closing notifications
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

    if (isLogged) {
      // Firebase Cloud Notification
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
              dispatch(setUserRegistrationDeviceId(token));

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
          pushNotification({
            text: payload.notification.body,
            icon: 'information-circle',
            close: true,
            type: 'info',
          });
        });
      };
      window.initFirebaseMessaging();

      // TODO: Check if this work OK
      // window.dismissNotification();

      // TODO: Init another map to show nearest shops
    }
    //   // navigator.serviceWorker.addEventListener('message', (message) => console.log(message));
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
