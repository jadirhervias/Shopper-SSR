/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductDetail from './ProductDetail';
import LocationModal from './LocationModal';
import ProcessPayment from './ProcessPayment';
import ShoppingBenefits from '../../assets/static/shopper-benefits.png';
import Breadcrumb from '../layout/Breadcrumb';
import SaveShopingCarModal from './SaveShoppingCarModal';

const ShoppingCar = () => {
  const commissionCost = 5;
  const shoppingCar = useSelector((state) => state.shoppingCar);
  const order = useSelector((state) => state.order);

  return (
    <div className="container">
      <div className="row m-0">
        <Breadcrumb />
      </div>

      {Object.keys(order).length > 0 && (
        <div className="d-flex flex-row bd-highlight justify-content-center p-0 my-4">
          <div className="alert alert-info" role="alert">
            Ya tienes una orden pendiente. Podr&aacute;s seguir pidiendo cuando
            llegue tu orden
          </div>
        </div>
      )}

      <div className="row my-4">
        <div
          className={Object.keys(order).length > 0 ? 'col-md-12' : 'col-md-8'}
        >
          {shoppingCar.products.length > 0 ? (
            <>
              <div className="row justify-content-between p-2 m-0">
                <h2>Carrito de Compras</h2>
                <button type="button" className="btn btn-danger">
                  Agregar un producto manualmente
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#modalSaveShoppingCar"
                  aria-describedby="saveShoppingCarHelpBlock"
                >
                  Guardar carrito
                </button>
              </div>
              <hr className="mt-3 mb-4 mx-1" />
              {shoppingCar.products.map((item) => (
                <ProductDetail key={item.id} {...item} />
              ))}
            </>
          ) : (
            <>
              <div className="d-flex flex-row bd-highlight justify-content-center p-4 m-0">
                <span>
                  <img
                    height={300}
                    src={ShoppingBenefits}
                    alt="shopper beneficios"
                  />
                </span>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-center p-4 m-0">
                <h2>No tienes productos en tu carrito</h2>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-center p-4">
                {Object.keys(order).length > 0 ? (
                  <button type="button" className="btn btn-danger btn-lg">
                    ¡Sigue explorando tus tiendas favoritas!
                  </button>
                ) : (
                  <Link className="btn btn-danger btn-lg" to="/">
                    Comprar ahora
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
        {Object.keys(order).length === 0 && (
          <>
            <div className="col-md-4">
              <div className="d-flex flex-row bd-highlight justify-content-center mx-0 mb-4">
                {/* style="width: 18rem;" */}
                <div className="card py-4 shadow-sm rounded">
                  {/* <div className="card-header"> */}
                  <div className="row justify-content-between m-0">
                    <h2 className="mx-4">Resumen de tu pedido</h2>
                  </div>
                  {/* </div> */}
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row justify-content-between m-0">
                        <div className="col-7">
                          <h5>{`Subtotal (${shoppingCar.count})`}</h5>
                        </div>
                        <div className="col-5 text-right">
                          {`S/. ${shoppingCar.totalCost}${
                            shoppingCar.totalCost % 1 === 0 ? '.00' : ''
                          }`}
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row justify-content-between m-0">
                        <div className="col-7">
                          <h5>Env&iacute;o</h5>
                        </div>
                        <div
                          className={`col-5 text-right ${
                            shoppingCar.totalCost >= 3 ? '' : 'text-muted'
                          }`}
                        >
                          &#43;
                          {`S/. ${commissionCost}${
                            commissionCost % 1 === 0 ? '.00' : ''
                          }`}
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row justify-content-between mx-0 my-4">
                        <div className="col-7">
                          <h4>
                            <strong>TOTAL</strong>
                          </h4>
                        </div>
                        <div className="col-5 text-right">
                          {`S/. ${
                            shoppingCar.totalCost >= 3
                              ? shoppingCar.totalCost + commissionCost
                              : shoppingCar.totalCost
                          }`}
                          {`${shoppingCar.totalCost % 1 === 0 ? '.00' : ''}`}
                        </div>
                      </div>
                      <div className="d-flex flex-row bd-highlight justify-content-center m-0 py-2">
                        <div className="col-12 text-center">
                          {shoppingCar.products.length > 0 &&
                          shoppingCar.totalCost >= 3 ? (
                            <p
                              className="product-detail--link"
                              data-toggle="modal"
                              data-target="#modalGoogleMaps"
                            >
                              Cambiar direcci&oacute;n de entrega por defecto
                            </p>
                          ) : (
                            <p>
                              Cambiar direcci&oacute;n de entrega por defecto
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-row bd-highlight justify-content-center m-0">
                        <div className="col-12 text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-lg"
                            data-toggle="modal"
                            data-target="#modalProcessPayment"
                            aria-describedby="processOrderHelpBlock"
                            disabled={
                              !(
                                shoppingCar.products.length > 0 &&
                                shoppingCar.totalCost >= 3
                              )
                            }
                          >
                            Procesar compra
                          </button>
                          <small
                            id="processOrderHelpBlock"
                            className="form-text text-muted"
                          >
                            Solo se procesan compras mayores o iguales a 3 soles
                          </small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <SaveShopingCarModal />
            <ProcessPayment />
            <LocationModal />
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCar;
