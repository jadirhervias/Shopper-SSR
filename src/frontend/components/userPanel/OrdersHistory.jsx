/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingBenefits from '../../assets/static/shopper-benefits.png';
import OrderItem from './OrderItem';

const OrdersHistory = () => {
  const dispatch = useDispatch();

  // const orderHistory = useSelector(state => state.orderHistory);

  const orderHistory = [
    {
      id: '3dd89r9187r019rn901r1m',
      cost: '120',
      date: '05/06/2020',
      address: 'Jr. Cuzco 267',
      state: 2,
    },
    {
      id: 'd3289r9187r019rn901r1m',
      cost: '84.67',
      date: '12/06/2020',
      address: 'Jr. Cuzco 267',
      state: 1,
    },
    {
      id: '3dd89r9187r019rn984r1m',
      cost: '224',
      date: '05/06/2020',
      address: 'Jr. Cuzco 267',
      state: 1,
    },
    {
      id: '3dd11r9187r019rn901r1m',
      cost: '52.5',
      date: '05/06/2020',
      address: 'Jr. Cuzco 267',
      state: 0,
    },
  ];

  return (
    <div className="container">
      {orderHistory.length > 0 ? (
        // shoppingCar.orderHistory.length > 0 ? (
        <>
          <div className="row justify-content-between p-2 m-0">
            <h2>Mis pedidos</h2>
          </div>
          <hr className="mt-3 mb-4 mx-1" />
          {
            // shoppingCar.orderHistory.map((item) => (
            orderHistory.map((item) => (
              <OrderItem key={item.id} {...item} />
            ))
          }
        </>
      ) : (
        <>
          <div className="row justify-content-center py-4 m-0">
            <span>
              <img height={300} src={ShoppingBenefits} alt="shopper-benefits" />
            </span>
          </div>
          <div className="row justify-content-center p-4 m-0">
            <h2>No haz realizado compras a&uacute;n</h2>
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
  );
};

export default OrdersHistory;
