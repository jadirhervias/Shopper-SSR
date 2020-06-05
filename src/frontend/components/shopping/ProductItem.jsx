/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductToCar,
  removeProductOfCar,
} from '../../actions/productsActions';
// import { connect } from 'react-redux';

const ProductItem = (currentProduct) => {
  const dispatch = useDispatch();

  const shoppingCar = useSelector((state) => state.shoppingCar);

  const alreadyAdded = shoppingCar.products.some(
    (items) => items.id === currentProduct.id
  );

  const handleAddToCar = (product) => {
    const newContent = {
      ...shoppingCar,
      count: alreadyAdded ? shoppingCar.count : shoppingCar.count + 1,
      products: alreadyAdded ?
        [...shoppingCar.products] :
        [...shoppingCar.products, product],
    };

    dispatch(addProductToCar(newContent));
  };

  const handleRemoveOfCar = (product) => {
    const remainingProducts = shoppingCar.products.filter(
      (items) => items.id !== product.id
    );

    const newContent = {
      ...shoppingCar,
      count: alreadyAdded ? shoppingCar.count - 1 : shoppingCar.count,
      products: remainingProducts,
    };

    dispatch(removeProductOfCar(newContent));
  };

  return (
    <div className="col products__container--product p-2">
      <div className="card h-100 product-content-scalable">
        <figure className="m-0">
          <img
            src={currentProduct.photo}
            className="card-img-top"
            alt={currentProduct.name}
          />
        </figure>
        <div className="card-body text-center">
          <h5 className="card-title">{currentProduct.name}</h5>
        </div>
        <div className="card-footer text-center m-0 p-1">
          <a
            data-toggle="modal"
            data-target={`#modal${currentProduct.id}`}
            className="card-text view-product-details"
          >
            Ver detalles
          </a>
        </div>
        <div className="card-footer text-center m-0">
          <small className="product-cost">{currentProduct.cost}</small>
        </div>
      </div>
      <div className="text-center products__container--add-to-cart bg-danger m-0 p-1">
        {alreadyAdded ? (
          <button
            type="button"
            className="btn"
            onClick={() => handleRemoveOfCar(currentProduct)}
          >
            Quitar del carrito
          </button>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={() => handleAddToCar(currentProduct)}
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
