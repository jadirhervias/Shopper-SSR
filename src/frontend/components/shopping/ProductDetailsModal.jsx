/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCar } from '../../actions/productsActions';
import { FirebaseContext } from '../../firebase/firebaseInit';

const ProductDetailsModal = (currentProduct) => {
  const dispatch = useDispatch();

  const shoppingCar = useSelector((state) => state.shoppingCar);

  const { storageRef } = useContext(FirebaseContext);

  const alreadyAdded = shoppingCar.products.some(
    (items) => items.id === currentProduct.id
  );

  const shoppingCarIndex = shoppingCar.products.findIndex(
    (product) => product.id === currentProduct.id
  );

  const [quantityValue, setQuantity] = useState(
    alreadyAdded ? shoppingCar.products[shoppingCarIndex].quantity : 0
  );

  useEffect(() => {
    storageRef
      .child(`products/${currentProduct.image}`)
      .getDownloadURL()
      .then((url) => {
        document.getElementById(`product-modal-${currentProduct.id}`).src = url;
      })
      .catch((error) => {
        console.log(error);
      });

    if (alreadyAdded) {
      setQuantity([
        shoppingCar.products[shoppingCarIndex] ?
          shoppingCar.products[shoppingCarIndex].quantity :
          [],
      ]);
    }
  }, [shoppingCar.products[shoppingCarIndex]]);

  const handleInput = (event) => {
    setQuantity(event.target.value);
  };

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

    const costList = productsList.map((item) => item.cost * item.quantity);

    const totalCost = costList.reduce(
      (accumulator, productCost) => accumulator + productCost
    );

    const newContent = {
      ...shoppingCar,
      count: totalQuantity,
      products: productsList,
      totalCost,
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
                    <img
                      id={`product-modal-${currentProduct.id}`}
                      src={currentProduct.image}
                      // src={
                      //   currentProduct.image ?
                      //     `data:image/jpeg;base64,${currentProduct.image.image}` :
                      //     'http://placehold.it/200x250'
                      // }
                      alt={currentProduct.name}
                      height={200}
                      width={200}
                      loading="lazy"
                    />
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
                      <h5>
                        {`S/. ${currentProduct.cost}${
                          currentProduct.cost % 1 === 0 ? '.00' : ''
                        }`}
                      </h5>
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
                          min={1}
                          max={20}
                        />
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
