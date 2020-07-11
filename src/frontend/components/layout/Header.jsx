/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
// import { renderToString } from 'react-dom/server';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import OrderTracking from '../orders/OrderTracking';
import { logoutUser } from '../../actions/authActions';
import { removeRegistrationDeviceId } from '../../actions/notificationActions';
import logo from '../../assets/static/shopper-logo.png';
import profile from '../../assets/static/user-icon.png';
import shoppingCarIcon from '../../assets/static/shopping-car.png';
import '../../assets/styles/components/Header.scss';

const Header = (props) => {
  const { user } = props;
  const hasUser = user.id && user.email;

  const shoppingCar = useSelector((state) => state.shoppingCar);

  // useEffect(() => {
  //   // Enable all popovers
  //   $(function () {
  //     $('[data-toggle="popover"]').popover();
  //   });

  //   $('#pendingOrders').popover({
  //     html: true,
  //     content: htmlPopover,
  //   });
  // }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    props.removeRegistrationDeviceId(user.registrationDeviceId, user.id);
    props.logoutUser('/');
  };

  return (
    <header className="header">
      <nav className="header__navBar navbar navbar-expand-md navbar-light">
        <Link to="/">
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            id="logo-shopper"
            alt="shopper"
          />
        </Link>

        <Link to="/carrito" className="shopping-car-link-2">
          <span className="icon-container">
            <img
              height="22"
              src={shoppingCarIcon}
              alt="shopping-car"
              className="mr-2"
            />
          </span>
          <span className="badge shopping-car-counter">
            {shoppingCar.count}
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse header__navBar--collapse"
          id="navbarTogglerDemo02"
        >
          {/* Menu links */}
          <ul className="navbar-nav header__navBar--menu mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link header__navBar--menu-link">
                Ayuda
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link header__navBar--menu-link">
                Premium
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle header__navBar--menu-link"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                COVID-19
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link to="/" className="dropdown-item">
                  Abastecimiento
                </Link>
                <div className="dropdown-divider" />
                <Link to="/" className="dropdown-item">
                  Separated link
                </Link>
              </div>
            </li>
          </ul>

          {hasUser ? (
            <>
              {/* Current order status */}
              {/* <a
                id="pendingOrders"
                tabIndex="0"
                className="btn btn-danger"
                role="button"
                data-container="body"
                data-toggle="popover"
                data-trigger="focus"
                data-placement="bottom"
                title="Pedidos"
                // data-content={
                //   renderToString(<OrderStatus />)
                // }
              >
                Popover current order
              </a> */}

              <div className="dropdown mr-4">
                <button
                  type="button"
                  data-toggle="dropdown"
                  className="btn btn-danger"
                >
                  Pedidos
                </button>
                <div className="dropdown-menu p-3">
                  <OrderTracking />
                </div>
              </div>

              {/* Shopping car */}
              <Link to="/carrito" className="shopping-car-link-1 mr-4">
                <span className="icon-container">
                  <img
                    height="22"
                    src={shoppingCarIcon}
                    alt="shopping-car"
                    className="mr-2"
                  />
                </span>
                <span className="badge shopping-car-counter">
                  {shoppingCar.count}
                </span>
              </Link>

              {/* Profile */}
              <ul className="navbar-nav header__navBar--profile">
                <img
                  src={profile}
                  alt={user.email}
                  className="header__navBar--profile-photo"
                />
                <li className="nav-item dropdown">
                  <Link
                    to="/"
                    className="nav-link dropdown-toggle header__navBar--profile-link mt-2"
                    id="navbarDropdownMenuLink2"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.email}
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink2"
                  >
                    <Link to="/user" className="dropdown-item user-options">
                      Mi Cuenta
                    </Link>
                    <div className="dropdown-divider" role="separator" />
                    <Link to="/admin" className="dropdown-item user-options">
                      Preferencias
                    </Link>
                    <div className="dropdown-divider" role="separator" />
                    <Link
                      to={{}}
                      className="dropdown-item user-options"
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </Link>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Shopping car */}
              <Link to="/carrito" className="shopping-car-link-1 mr-4">
                <span className="icon-container">
                  <img
                    height="22"
                    src={shoppingCarIcon}
                    alt="shopping-car"
                    className="mr-2"
                  />
                </span>
                <span className="badge shopping-car-counter">
                  {shoppingCar.count}
                </span>
              </Link>

              {/* auth */}
              <ul className="navbar-nav header__navBar--auth text-center">
                <li className="nav-item">
                  <Link
                    to="/login"
                    data-rb-event-key="/login"
                    className="header__navBar--auth-login nav-link"
                  >
                    Iniciar Sesi&oacute;n
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="header__navBar--auth--register-button btn btn-md"
                    to="/registrar"
                  >
                    Reg&iacute;strate
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
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
  logoutUser,
  removeRegistrationDeviceId,
};

// connect: conecta los props y dispatch que se utilizarán en el componente (Header)
export default connect(mapStateToProps, mapDispatchToProps)(Header);
