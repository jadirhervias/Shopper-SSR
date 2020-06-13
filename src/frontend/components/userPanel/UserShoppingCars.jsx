/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingBenefits from '../../assets/static/shopper-benefits.png';
import ShoppingCarItem from './ShoppingCarItem';

const UserShoppingCars = () => {
  const dispatch = useDispatch();

  const savedShoppingCars = useSelector((state) => state.savedShoppingCars);

  return (
    <div className="container">
      {savedShoppingCars.length > 0 ? (
        <>
          <div className="row justify-content-between p-2 m-0">
            <h2>Mis carritos de compra</h2>
          </div>
          <hr className="mt-3 mb-4 mx-1" />
          {savedShoppingCars.map((item) => (
            <ShoppingCarItem key={item.id} {...item} />
          ))}
        </>
      ) : (
        <>
          <div className="row justify-content-center py-4 m-0">
            <span>
              <img height={300} src={ShoppingBenefits} alt="shopper-benefits" />
            </span>
          </div>
          <div className="row justify-content-center p-4 m-0">
            <h2>No haz realizado compras aún</h2>
            <h4>
              ¡Encuentra los productos de tus tiendas favoritas cerca de ti!
            </h4>
          </div>
          <div className="row justify-content-center p-4">
            <button type="button" className="btn btn-danger btn-lg">
              Comprar ahora
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserShoppingCars;
