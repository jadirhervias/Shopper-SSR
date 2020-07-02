/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreditCardIcon from '../../assets/static/credit-card.png';
import {
  validateTokenCard,
  saveUserCard,
  verifyAndPayOrder,
} from '../../actions/orderAction';

const ProcessPayment = () => {
  const dispatch = useDispatch();

  // Order details
  const order = useSelector((state) => state.order);
  const shop = useSelector((state) => state.currentShop);
  const user = useSelector((state) => state.user);
  const shoppingCar = useSelector((state) => state.shoppingCar);

  const [payForm, setPayform] = useState({
    card_number: '',
    cvv: '',
    expiration_month: '',
    expiration_year: '',
    email: '',
    // saveCard: false,
  });

  const [orderForm, setOrderForm] = useState({
    customer: user,
    shopper: null,
    shop_id: shop.id,
    coordenates: {
      lat: user.lat,
      lng: user.lng,
    },
    firebase_db_reference_key: null,
    shopping_car: null,
    state: 0,
    fecha_compra: null,
    fecha_entrega: null,
    description: null,
    total_cost: null,
    source_id: null,
    // No pay verification ID yet
  });

  console.log(payForm);

  const handleInput = (event) => {
    setPayform({
      ...payForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e, currentShoppingCar) => {
    // para evitar recargas de página, cambios en la URL, comportamientos típicos de html
    e.preventDefault();

    // const form = {
    //   ...payForm,
    // };

    // if (payForm.saveCard) {
    //   delete form.saveCard;
    //   dispatch(saveUserCard(form, userId));
    // }

    dispatch(verifyAndPayOrder(payForm, orderForm, currentShoppingCar));
  };

  return (
    <div
      className="modal fade"
      id="modalProcessPayment"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
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
              <div className="row justify-content-center align-items-center mb-2">
                <h3>Pago</h3>
              </div>
              <div className="row justify-content-center align-items-center p-4">
                <form
                  action="POST"
                  onSubmit={(e) => handleSubmit(e, shoppingCar)}
                >
                  <div className="row justify-content-center align-items-center mb-2">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="card_number"
                        className="form-control"
                        placeholder="Número de la tarjeta"
                        onChange={handleInput}
                        required
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center align-items-center mb-2">
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <input
                        type="text"
                        name="expiration_month"
                        className="form-control"
                        placeholder="MM"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <input
                        type="text"
                        name="expiration_year"
                        className="form-control"
                        placeholder="AA"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <input
                        type="text"
                        name="cvv"
                        className="form-control"
                        placeholder="CVV"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <img
                        src={CreditCardIcon}
                        className="img-rounded"
                        alt="credit-card"
                      />
                    </div>
                  </div>
                  {/* <div className="row justify-content-center align-items-center mb-2">
                        <div className="col-md-12">
                          <input type="text" className="form-control" placeholder="Nombre en la tarjeta" />
                        </div>
                      </div> */}
                  <div className="row justify-content-center align-items-center mb-2">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleInput}
                        required
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center align-items-center mb-2">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="form-check">
                          {/* is-invalid */}
                          <input
                            className="form-check-input"
                            name="saveCard"
                            type="checkbox"
                            value=""
                            id="invalidCheck3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="invalidCheck3"
                          >
                            Guardar tarjeta para proximas compras
                          </label>
                          {/* <div className="invalid-feedback">
                                You must agree before submitting.
                              </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center align-items-center mb-2">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <input
                        type="submit"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        value="Cancelar"
                      />
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <input
                        type="submit"
                        className="btn btn-danger btn-block"
                        // data-dismiss="modal"
                        // aria-label="Close"
                        value="Pagar ahora"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessPayment;
