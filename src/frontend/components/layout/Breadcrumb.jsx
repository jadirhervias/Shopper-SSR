/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { matchPath, withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import {
  isRunningOnClientSide,
  isRunningOnServerSide,
} from '../../utils/windowReference';
import '../../assets/styles/components/Breadcrumb.scss';

const Breadcrumb = () => {
  const currentShop = useSelector((state) => state.currentShop);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb breadcrumb__container">
        <>
          {isRunningOnClientSide &&
            (window.location.pathname === '/productos' ? (
              <>
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Tienda
                </li>
              </>
            ) : (
              window.location.pathname === '/carrito' && (
                <>
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  {Object.keys(currentShop).length !== 0 && (
                    <li className="breadcrumb-item">
                      <Link to="/productos">Tienda</Link>
                    </li>
                  )}
                  <li className="breadcrumb-item active" aria-current="page">
                    Carrito
                  </li>
                </>
              )
            ))}
        </>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
