import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import Shopping from '../containers/Shopping';
import Login from '../containers/auth/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Layout from '../components/layout/Layout';

// Provider: Permite encapsular nuestros componente por medio de un connect,
// para poder transmitir toda la informacion del STORE(estado) a todos los componentes dentro

const App = ({ isLogged }) => (
  // Encapsula los componentes que se necesitan y sus rutas
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registrar" component={Register} />
        {/* <Route exact path="/comprar" component={Form} /> */}
        <Route
          exact
          path="/productos"
          component={isLogged ? Shopping : Login}
        />
        {/* <Route exact path="/comprar" component={isLogged ? Compra : Login} /> */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
