/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreditCardIcon from '../../assets/static/credit-card.png';
import { emailValidator, trimFilter } from '../../utils/inputValidators';
import { verifyAndPayOrder } from '../../actions/orderAction';
import securePay from '../../assets/static/secure-pay.png';

const ProcessPayment = () => {
  const dispatch = useDispatch();

  const commissionCost = 5;
  const shop = useSelector((state) => state.currentShop);
  const user = useSelector((state) => state.user);
  const shoppingCar = useSelector((state) => state.shoppingCar);
  const orderCoordenates = useSelector((state) => state.orderCoordenates);

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
    coordenates: {},
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

  useEffect(() => {
    console.log(orderCoordenates);
    console.log('payment modal mounted!');
  }, [orderCoordenates]);

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

    const payFormValidated = trimFilter(payForm);

    if (emailValidator(payFormValidated.email)) {
      dispatch(
        verifyAndPayOrder(
          payFormValidated,
          orderForm,
          currentShoppingCar,
          commissionCost,
          orderCoordenates
        )
      );
    } else {
      console.log('VERIFIQUE EMAIL INGRESADO');
    }
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
              <div className="d-flex flex-row bd-highlight justify-content-center align-items-center mb-2">
                <h3>Pago</h3>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-center align-items-center p-4">
                <form
                  action="POST"
                  onSubmit={(e) => handleSubmit(e, shoppingCar)}
                >
                  <div className="d-flex flex-column bd-highlight mb-2">
                    {/* <div className="d-flex flex-column bd-highlight"> */}
                    <input
                      type="text"
                      name="card_number"
                      className="form-control"
                      placeholder="Número de la tarjeta"
                      onChange={handleInput}
                      required
                    />
                  </div>
                  {/* </div> */}
                  <div className="d-flex flex-row bd-highlight justify-content-between align-items-center mb-2">
                    <div className="bd-highlight pr-2">
                      <input
                        type="text"
                        name="expiration_month"
                        className="form-control"
                        placeholder="MM"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="bd-highlight px-3">
                      <input
                        type="text"
                        name="expiration_year"
                        className="form-control"
                        placeholder="AA"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="bd-highlight px-3">
                      <input
                        type="text"
                        name="cvv"
                        className="form-control"
                        placeholder="CVV"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="bd-highlight pl-2">
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
                  <div className="d-flex flex-column bd-highlight mb-2">
                    {/* <div className="d-flex flex-column bd-highlight"> */}
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={handleInput}
                      required
                    />
                  </div>
                  {/* </div> */}
                  <div className="d-flex flex-row bd-highlight justify-content-center align-items-center mb-2">
                    <div className="bd-highlight">
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
                  <div className="d-flex flex-row bd-highlight justify-content-center align-items-center mb-2">
                    <div className="bd-highlight">
                      <img src={securePay} alt="scure-pay" />
                    </div>
                    <div className="bd-highlight pl-1">
                      <span>Pago seguro</span>
                    </div>
                  </div>
                  <div className="d-flex flex-row bd-highlight justify-content-center align-items-center mb-2">
                    <div className="bd-highlight px-5">
                      <input
                        type="submit"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        value="Cancelar"
                      />
                    </div>
                    <div className="bd-highlight px-5">
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
