import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../assets/styles/components/Breadcrumb.scss';

const Breadcrumb = () => {
  const location = useLocation();
  const currentShop = useSelector((state) => state.currentShop);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb breadcrumb__container">
        <>
          {location.pathname === '/productos' ? (
            <>
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {`Tienda (${currentShop.name})`}
              </li>
            </>
          ) : (
            location.pathname === '/carrito' && (
              <>
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                {Object.keys(currentShop).length !== 0 && (
                  <li className="breadcrumb-item">
                    <Link to="/productos">{`Tienda (${currentShop.name})`}</Link>
                  </li>
                )}
                <li className="breadcrumb-item active" aria-current="page">
                  Carrito
                </li>
              </>
            )
          )}
        </>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
