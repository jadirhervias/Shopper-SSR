import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingCarIcon from '../../assets/static/shopping-car.png';
import '../../assets/styles/components/ShoppingCarCounter.scss';

const ShoppingCarCounter = () => {
  const shoppingCar = useSelector((state) => state.shoppingCar);

  return (
    <>
      <div className="input-group-append">
        <Link
          to="/carrito"
          className="btn searchShoppingCar__container--button-shoppingCar"
          type="button"
          id="button-addon2"
        >
          <span>
            <img
              height={24}
              src={ShoppingCarIcon}
              alt="carrito de compras"
              className="mr-2"
            />
          </span>
          <strong>Carrito de compras</strong>
        </Link>
        <span className="shopping-car-counter input-group-text m-0">
          <strong>{shoppingCar.count}</strong>
        </span>
      </div>
    </>
  );
};

export default ShoppingCarCounter;
