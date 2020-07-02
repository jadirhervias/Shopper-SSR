import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Shopping from '../containers/Shopping';
import ShoppingCarOrder from '../containers/ShoppingCarOrder';
import UserPanel from '../containers/UserPanel';
import Admin from '../containers/Admin';

const serverRoutes = (isLogged) => {
  return [
    {
      exact: true,
      path: '/',
      component: Home,
    },
    {
      exact: true,
      path: '/login',
      component: !isLogged ? Login : Home,
    },
    {
      exact: true,
      path: '/registrar',
      component: !isLogged ? Register : Home,
    },
    {
      exact: true,
      path: '/productos',
      component: isLogged ? Shopping : Login,
    },
    {
      exact: true,
      path: '/carrito',
      component: isLogged ? ShoppingCarOrder : Login,
    },
    {
      exact: true,
      path: '/user',
      component: isLogged ? UserPanel : Login,
    },
    {
      exact: true,
      path: '/admin',
      component: isLogged ? Admin : Login,
    },
    {
      name: 'NotFound',
      component: NotFound,
    },
  ];
};

export default serverRoutes;
