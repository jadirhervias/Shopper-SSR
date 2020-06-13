import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductToCar,
  removeProductOfCar,
} from '../../actions/productsActions';
import '../../assets/styles/components/ProductDetail.scss';

const ProductDetail = (product) => {
  const [quantityValue, setQuantity] = useState(product.quantity);

  const dispatch = useDispatch();

  const shoppingCar = useSelector((state) => state.shoppingCar);

  const handleAddToCar = (product) => {
    // Get the products in the shopping car
    const productsList = [...shoppingCar.products];

    const index = productsList.findIndex((item) => item.id === product.id);

    productsList[index]['quantity'] = productsList[index]['quantity'] + 1;

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

  const handleRemoveOfCar = (product) => {
    // Get the products in the shopping car
    const productsList = [...shoppingCar.products];

    const index = productsList.findIndex((item) => item.id === product.id);

    let newContent;

    if (productsList[index]['quantity'] === 1) {
      // To remove the product of the shopping car instead of minus 1
      const remainingProducts = shoppingCar.products.filter(
        (item) => item.id !== product.id
      );

      newContent = {
        ...shoppingCar,
        // count: totalQuantity,
        count: shoppingCar.count - 1,
        products: remainingProducts,
      };
    } else {
      productsList[index]['quantity'] = productsList[index]['quantity'] - 1;

      newContent = {
        ...shoppingCar,
        count: shoppingCar.count - 1,
        products: productsList,
      };
    }

    dispatch(removeProductOfCar(newContent));
  };

  const handleInput = (event, newProduct) => {
    // event.preventDefault();

    const productQuantity = newProduct.quantity;

    setQuantity(event.target.value);

    if (productQuantity < event.target.value) {
      handleAddToCar(newProduct);
    } else if (productQuantity > event.target.value) {
      handleRemoveOfCar(newProduct);
    }
  };

  const handleRemoveCompletely = (product) => {
    const remainingProducts = shoppingCar.products.filter(
      (item) => item.id !== product.id
    );

    let newContent;

    if (remainingProducts.length === 0) {
      newContent = {
        ...shoppingCar,
        count: 0,
        products: [],
      };
    } else {
      const quantityList = remainingProducts.map((item) => item.quantity);
      const totalQuantity = quantityList.reduce(
        (accumulator, productQuantity) => accumulator + productQuantity
      );

      newContent = {
        ...shoppingCar,
        count: totalQuantity,
        products: remainingProducts,
      };
    }

    dispatch(removeProductOfCar(newContent));
  };

  return (
    // style="max-width: 540px;"
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src="http://placehold.it/150x150"
            className="card-img"
            alt="producto"
          />
        </div>
        <div className="col-md-4 p-2">
          {/* <div className="card-body"> */}
          <h4 className="card-title">{product.name}</h4>
          <h6 className="card-text">{product.brand}</h6>
          <p className="card-text">{product.details}</p>
          <p className="card-text">
            <small className="text-muted">{product.format}</small>
          </p>
          <h3 className="card-title">
            S/.
            {product.cost}
          </h3>
          {/* </div> */}
        </div>
        <div className="col-md-4">
          <div className="card-body">
            <div className="row justify-content-center align-items-center">
              <div className="col-sm-12 text-center">
                <div className="input-group p-2">
                  <input
                    className="form-control"
                    type="number"
                    min={1}
                    max={20}
                    value={quantityValue}
                    onChange={(e) => handleInput(e, product)}
                  />
                </div>
              </div>
              <div className="col-sm-12 text-center">
                <p
                  className="card-text product-detail--link"
                  onClick={() => {}}
                >
                  Guardar para despu&eacute;s
                </p>
                <p
                  className="card-text product-detail--link"
                  onClick={() => handleRemoveCompletely(product)}
                >
                  Quitar del carrito
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;