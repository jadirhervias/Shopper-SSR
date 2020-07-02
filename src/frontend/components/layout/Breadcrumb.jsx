import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <>
          {window.location.pathname === '/productos' ? (
            <>
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Tienda
              </li>
            </>
          ) : window.location.pathname === '/carrito' ? (
            <>
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/productos">Tienda</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Carrito
              </li>
            </>
          ) : (
            <div />
          )}
        </>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
