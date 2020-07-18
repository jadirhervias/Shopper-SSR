/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from './OrderItem';
import Spinner from '../layout/Spinner';
import ShoppingBenefits from '../../assets/static/shopper-benefits.png';
import { showUserOrdersHistory } from '../../actions/userActions';

const OrdersHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const loading = useSelector((state) => state.loading);
  const orderHistory = useSelector((state) => state.orderHistory);

  useEffect(() => {
    dispatch(showUserOrdersHistory(user.id));
  }, [dispatch, order]);

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {orderHistory.length > 0 ? (
            <>
              <div className="row justify-content-between p-2 m-0">
                <h2>Mis pedidos</h2>
              </div>
              <hr className="mt-3 mb-4 mx-1" />
              {orderHistory.map((item) => (
                <OrderItem key={item.id} {...item} />
              ))}
            </>
          ) : (
            <>
              <div className="row justify-content-center py-4 m-0">
                <span>
                  <img
                    height={300}
                    src={ShoppingBenefits}
                    alt="shopper-benefits"
                  />
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
        </>
      )}
    </div>
  );
};

export default OrdersHistory;
