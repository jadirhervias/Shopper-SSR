import Home from '../containers/Home';
import Login from '../containers/auth/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Shopping from '../containers/Shopping';
import PersonalPanel from '../containers/PersonalPanel';

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
      path: '/personal',
      component: isLogged ? PersonalPanel : Login,
    },
    {
      name: 'NotFound',
      component: NotFound,
    },
  ];
};

export default serverRoutes;
