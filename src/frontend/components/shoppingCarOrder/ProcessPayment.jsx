/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreditCardIcon from '../../assets/static/credit-card.png';
import { validateTokenCard, saveUserCard } from '../../actions/orderAction';

const ProcessPayment = () => {
  const apiResponse = {
    object: 'token',
    id: 'tkn_test_PZhq7Fsge17oi7YB',
    type: 'card',
    creation_date: 1591917198000,
    email: 'jadir@gmail.com',
    card_number: '411111******1111',
    last_four: '1111',
    active: true,
    iin: {
      object: 'iin',
      bin: '411111',
      card_brand: 'Visa',
      card_type: 'credito',
      card_category: 'Clásica',
      issuer: {
        name: 'BBVA',
        country: 'PERU',
        country_code: 'PE',
        website: null,
        phone_number: null,
      },
      installments_allowed: [2, 4, 6, 8, 10, 12, 3, 5, 7, 9, 24, 48],
    },
    client: {
      ip: '190.237.151.232',
      ip_country: 'Peru',
      ip_country_code: 'PE',
      browser: 'UNKNOWN',
      device_fingerprint: null,
      device_type: 'Escritorio',
    },
    metadata: {},
  };

  const dispatch = useDispatch();

  // const user = useSelector(state => state.user);
  const userId = '5eb2444263a89e5437c8da95';

  const [payForm, setValues] = useState({
    card_number: '',
    cvv: '',
    expiration_month: '',
    expiration_year: '',
    email: '',
    saveCard: false,
  });

  console.log(payForm);

  const handleInput = (event) => {
    setValues({
      ...payForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    // para evitar recargas de página, cambios en la URL, comportamientos típicos de html
    event.preventDefault();

    const form = {
      ...payForm,
    };

    if (payForm.saveCard) {
      delete form.saveCard;
      dispatch(saveUserCard(form, userId));
    }

    console.log('FORM TO VALIDATE CARD');
    console.log(form);

    dispatch(validateTokenCard(form));
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
                <form action="POST" onSubmit={handleSubmit}>
                  <div className="row justify-content-center align-items-center mb-2">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="card_number"
                        className="form-control"
                        placeholder="Número de la tarjeta"
                        onChange={handleInput}
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
                      />
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <input
                        type="text"
                        name="expiration_year"
                        className="form-control"
                        placeholder="AA"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-3">
                      <input
                        type="text"
                        name="cvv"
                        className="form-control"
                        placeholder="CVV"
                        onChange={handleInput}
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
