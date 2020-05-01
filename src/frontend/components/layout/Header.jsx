import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/components/Header.scss';
import logo from '../../assets/static/shopper-icon.png';
import profile from '../../assets/static/user-icon.png';

const Header = () => (
  <header className="header">
    {/* Link evita refrescarse y no se nota al recargar la página, lo cual no pasa si usamos <a>...</a> */}
    <Link to="/">
      <img src={logo} alt="Shopper" className="header__img" />
    </Link>
    <p>Shopper</p>
    <div className="header__menu">
      <div className="header__menu--profile">
        <img src={profile} alt="profile" />
        <p>Perfil</p>
      </div>
      <ul>
        <li>
          <Link to="/login">Iniciar Sesión</Link>
        </li>
        {/* <li>
          <a href="/">Cerrar Sesión</a>
        </li> */}
      </ul>
    </div>
  </header>
);

export default Header;
