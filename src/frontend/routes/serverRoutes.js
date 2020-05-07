import Home from '../containers/Home';
import Login from '../containers/auth/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';

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
      component: Login,
    },
    {
      exact: true,
      path: '/registrar',
      component: Register,
    },
    {
      name: 'NotFound',
      component: NotFound,
    },
  ];
};

export default serverRoutes;
