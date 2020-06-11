/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCar } from '../../actions/productsActions';

const ProductItem = (currentProduct) => {
  const [quantityValue, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const shoppingCar = useSelector((state) => state.shoppingCar);

  const alreadyAdded = shoppingCar.products.some(
    (items) => items.id === currentProduct.id
  );

  const handleAddToCar = (product) => {
    // Get the products in the shopping car
    let productsList = [...shoppingCar.products];

    let index;

    if (!alreadyAdded) {
      // Once the product is added by first time, set the quantity
      const thisProduct = {
        ...product,
        quantity: 0,
      };

      // Set the new products list for the shopping car
      productsList = [...productsList, thisProduct];

      index = productsList.findIndex((item) => item.id === thisProduct.id);
    } else {
      // Find the index product in the shopping car products list
      index = productsList.findIndex((item) => item.id === product.id);
    }

    productsList[index]['quantity'] = parseInt(quantityValue, 10);

    const quantityList = productsList.map((item) => item.quantity);

    const totalQuantity = quantityList.reduce(
      (accumulator, productQuantity) => accumulator + productQuantity
    );

    const newContent = {
      ...shoppingCar,
      count: totalQuantity,
      products: productsList,
    };

    dispatch(addProductToCar(newContent));
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
        <button
          type="button"
          className="btn"
          onClick={() => handleAddToCar(currentProduct)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
