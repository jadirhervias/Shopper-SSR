/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logoutRequest } from '../../actions';

import '../../assets/styles/components/Header.scss';
import logo from '../../assets/static/shopper-logo.png';
import profile from '../../assets/static/user-icon.png';

const Header = (props) => {
  const { user } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    // vaciar los datos del usuario
    document.cookie = 'id=';
    document.cookie = 'email=';
    document.cookie = 'fullName=';
    document.cookie = 'token=';
    props.logoutRequest({});
    window.location.href = '/';
  };

  return (
    <header className="header">
      {/* Link evita refrescarse y no se nota al recargar la página, lo cual no pasa si usamos <a>...</a> */}
      <Navbar collapseOnSelect expand="md" className="header__navBar">
        <Link to="/">
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            id="logo-shopper"
            alt="shopper"
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="header__navBar--collapse"
        >
          <Nav className="header__navBar--menu mr-auto">
            <Link to="/">Ayuda</Link>
            <Link to="/">Premium</Link>
            <NavDropdown
              title="COVID-19"
              id="collasible-nav-dropdown"
              className="header__navBar--menu-dropdown"
            >
              <Link to="/">Abastecimiento</Link>
              <NavDropdown.Divider />
              <Link to="/">Separated link</Link>
            </NavDropdown>
          </Nav>
          {hasUser ? (
            <Nav className="header__navBar--profile">
              <img
                src={profile}
                alt={user.email}
                className="header__navBar--profile-photo"
              />
              <NavDropdown title={user.fullName} id="collasible-nav-dropdown">
                <Link to="/">Mi Cuenta</Link>
                <NavDropdown.Divider />
                <Link to="/">Preferencias</Link>
                <NavDropdown.Divider />
                <Link to="/" onClick={handleLogout}>
                  Cerrar Sesión
                </Link>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="header__navBar--auth">
              <Nav.Link href="/login" className="header__navBar--auth-login">
                Iniciar Sesión
              </Nav.Link>
              <Link
                to="/registrar"
                className="header__navBar--auth--register-button btn btn-md"
              >
                Regístrate
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

// mapStateToProps: Mapea las propiedades del estado que se requieren en el componente actual
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

// mapDispatchToProps: Disparar las acciones (que cambian el estado del DOM)
// Después del Action, mapear sus datos con lo siguiente
const mapDispatchToProps = {
  logoutRequest,
};

// connect: conecta los props y dispatch que se utilizarán en el componente (Header)
export default connect(mapStateToProps, mapDispatchToProps)(Header);
