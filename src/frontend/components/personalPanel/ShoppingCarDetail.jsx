/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import ProductDetail from './ProductDetail';
import LocationModal from './LocationModal';
import ShoppingBenefits from '../../assets/static/shopper-benefits.png';

const ShoppingCarDetail = () => {
  const shoppingCar = useSelector((state) => state.shoppingCar);

  return (
    <div className="row m-0">
      <div className="col-md-8 py-4">
        {shoppingCar.products.length > 0 ? (
          <>
            <div className="row justify-content-between p-4 m-0">
              <h2>Carrito de Compras</h2>
              <button type="button" className="btn btn-danger">
                Agregar un producto no encontrado
              </button>
            </div>
            <hr className="mt-3 mb-4 mx-1" />
            {shoppingCar.products.map((item) => (
              <ProductDetail key={item.id} {...item} />
            ))}
          </>
        ) : (
          <>
            <div className="row justify-content-center p-4 m-0">
              <span>
                <img
                  height={300}
                  src={ShoppingBenefits}
                  alt="shopper beneficios"
                />
              </span>
            </div>
            <div className="row justify-content-center p-4 m-0">
              <h2>No tienes productos en tu carrito</h2>
              <h4>
                ¡Encuentra los productos de tus tiendas favoritas cerca de ti!
              </h4>
            </div>
            <div className="row justify-content-center p-4">
              <button type="button" className="btn btn-danger btn-lg">
                Comprar ahora
              </button>
            </div>
          </>
        )}
      </div>
      <div className="col-md-4 py-4 my-4">
        <div className="row justify-content-center mx-0 mb-4">
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
                  <div className="col-8">
                    <h5>{`Subtotal (${shoppingCar.count})`}</h5>
                  </div>
                  <div className="col-4 text-right">
                    {`S/. ${shoppingCar.total}.00`}
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row justify-content-between m-0">
                  <div className="col-8">
                    <h5>Env&iacute;o</h5>
                  </div>
                  <div className="col-4 text-right">{`S/. ${5}.00`}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row justify-content-between mx-0 my-4">
                  <div className="col-8">
                    <h4>
                      <strong>TOTAL</strong>
                    </h4>
                  </div>
                  <div className="col-4 text-right">
                    {`S/. ${shoppingCar.total + 5}.00`}
                  </div>
                </div>
                <div className="row justify-content-center m-0 py-2">
                  <div className="col-12 text-center">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-toggle="modal"
                      data-target="#modalGoogleMaps"
                      disabled={!(shoppingCar.products.length > 0)}
                    >
                      Ubicación y dirección
                    </button>
                  </div>
                </div>
                <div className="row justify-content-center m-0">
                  <div className="col-12 text-center">
                    <button
                      type="button"
                      className="btn btn-danger btn-lg"
                      disabled={!(shoppingCar.products.length > 0)}
                    >
                      Procesar compra
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <LocationModal />
    </div>
  );
};

export default ShoppingCarDetail;
