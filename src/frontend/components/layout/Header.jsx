/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutRequest } from '../../actions';
import '../../assets/styles/components/Header.scss';
import logo from '../../assets/static/shopper-icon.png';
import profile from '../../assets/static/user-icon.png';

const Header = (props) => {
  const { user } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    // vaciar los datos del usuario
    props.logoutRequest({});
  };

  return (
    <header className="header">
      {/* HEADER ANTERIOR */}

      {/* Link evita refrescarse y no se nota al recargar la página, lo cual no pasa si usamos <a>...</a> */}
      <Link to="/">
        <img src={logo} alt="Shopper" className="header__img" />
      </Link>
      <p>Shopper</p>
      <div className="header__menu">
        <div className="header__menu--profile">
          {hasUser ? (
            <img src={profile} alt={user.email} />
          ) : (
            <img src="" alt="profile" />
          )}
          <p>
            {user.first_name} {user.last_name}
          </p>
        </div>
        <div className="header__menu--profile-options">
          <ul>
            {hasUser && (
              <li>
                <Link to="/">Mi cuenta</Link>
              </li>
            )}
            {hasUser && (
              <li>
                <Link to="/">Preferencias</Link>
              </li>
            )}
            {hasUser ? (
              <li>
                <a href="/" onClick={handleLogout}>
                  Cerrar sesión
                </a>
              </li>
            ) : (
              <li>
                <Link to="/login">Iniciar sesión</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* FIN */}
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
