/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';

const OrderDetail = () => {
  useEffect(() => {}, []);

  return (
    <div
      className="modal fade"
      id="modalOrderDetail"
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
              <div className="d-flex flex-row bd-highlight justify-content-center my-2">
                <h3>detalles</h3>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-center align-items-center p-4">
                <form action="POST" onSubmit={handleSubmit}>
                  <div className="d-flex flex-row bd-highlight justify-content-start mt-2 mb-1">
                    <div className="bd-highlight p-2">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            checked={checked}
                            name="giveName"
                            type="checkbox"
                            id="giveNameCheck"
                            onChange={() => setChecked(!checked)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="giveNameCheck"
                          >
                            Darle un nombre al carrito
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {checked && (
                    <div className="d-flex flex-row bd-highlight justify-content-start">
                      <div className="bd-highlight p-2">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Nombre para el carrito"
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  )}
                  <div className="d-flex flex-row bd-highlight justify-content-around my-2">
                    <div className="bd-highlight p-2">
                      <img
                        id={`currentShop__image-${shop.id}`}
                        className="shoppingCarShop__img"
                        alt={shop.name}
                      />
                    </div>
                    <div className="bd-highlight p-2 align-self-center">
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Productos de cat&aacute;logo:
                          <span className="badge badge-info">
                            {shoppingCar.count}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Productos agregados manualmente:
                          <span className="badge badge-info">1</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Costo total:
                          <span className="badge badge-info">
                            {`S/. ${shoppingCar.totalCost + commissionCost}${
                              shoppingCar.totalCost % 1 === 0 ? '.00' : ''
                            }`}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex flex-row bd-highlight justify-content-around mt-3 mb-2">
                    <div className="bd-highlight p-2">
                      <input
                        type="submit"
                        className="btn btn-lg btn-secondary"
                        data-dismiss="modal"
                        value="Cancelar"
                      />
                    </div>
                    <div className="bd-highlight p-2">
                      <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Guardar"
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

export default OrderDetail;
