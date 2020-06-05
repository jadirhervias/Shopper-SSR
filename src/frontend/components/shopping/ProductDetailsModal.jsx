/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductToCar,
  removeProductOfCar,
} from '../../actions/productsActions';

const ProductDetailsModal = (currentProduct) => {
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
                  <div className="row py-2">
                    <div className="col-md-12 text-center">
                      {alreadyAdded ? (
                        <button
                          type="button"
                          className="btn btn-lg btn-danger modal__add-to-car-button"
                          onClick={() => handleRemoveOfCar(currentProduct)}
                        >
                          Quitar del carrito
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-lg btn-danger modal__add-to-car-button"
                          onClick={() => handleAddToCar(currentProduct)}
                        >
                          Agregar al carrito
                        </button>
                      )}
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
