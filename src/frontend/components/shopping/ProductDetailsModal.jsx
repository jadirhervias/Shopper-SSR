/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCar } from '../../actions/productsActions';

const ProductDetailsModal = (currentProduct) => {
  const [quantityValue, setQuantity] = useState(0);

  const handleInput = (event) => {
    setQuantity(event.target.value);
  };

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

  // Modal de detalles de producto
  return (
    <div
      className="modal fade"
      id={`modal${currentProduct.id}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row justify-content-end">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="col-md-6 text-center">
                  <figure className="m-0 p-0">
                    <img src={currentProduct.photo} alt={currentProduct.name} />
                  </figure>
                </div>
                <div className="col-md-6">
                  <div className="row py-2">
                    <div className="col-md-12">Rating Stars</div>
                  </div>
                  <div className="row py-2">
                    <div className="col-md-12">
                      <h2 className="font-weight-bold">
                        {currentProduct.name}
                      </h2>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-md-6 text-left">
                      <h5>{currentProduct.cost}</h5>
                    </div>
                    <div className="col-md-6 text-right">
                      <small>{currentProduct.format}</small>
                    </div>
                  </div>
                  <div className="row justify-content-center align-items-center py-2">
                    <div className="col-md-9 text-center">
                      <button
                        type="button"
                        className="btn btn-lg btn-danger modal__add-to-car-button"
                        onClick={() => handleAddToCar(currentProduct)}
                        data-dismiss="modal"
                      >
                        Agregar al carrito
                      </button>
                    </div>
                    <div className="col-md-3 text-center">
                      <div className="form-group">
                        <label>Cantidad</label>
                        <input
                          className="form-control"
                          type="number"
                          value={quantityValue}
                          onChange={handleInput}
                        />
                        {/* <select
                          className='form-control'
                          type='number'
                          value={quantityValue}
                          onChange={handleSelect}
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select> */}
                      </div>
                    </div>
                  </div>
                  <div className="row py-2">
                    <div className="col-md-12">
                      <p className="text-left text-break">
                        {currentProduct.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <small className="text-muted">Más detalles</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
