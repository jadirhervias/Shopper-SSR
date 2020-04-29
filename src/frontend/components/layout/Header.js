import React from 'react';
import '../../assets/styles/components/Header.scss';
import logo from '../../assets/static/logo-shopper.png';
import profile from '../../assets/static/user-icon.png';

const Header = () => (
  <header className="header">
    <img src={logo} alt="logo-shoper" className="header__img" />
    <p>Shopper</p>
    <div className="header__menu">
      <div className="header__menu--profile">
        <img src={profile} alt="profile" />
        <p>Perfil</p>
      </div>
      <ul>
        <li>
          <a href="/">Cuenta</a>
        </li>
        <li>
          <a href="/">Cerrar Sesión</a>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
