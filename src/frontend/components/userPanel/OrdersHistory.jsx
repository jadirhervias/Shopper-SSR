/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OrdersPagination from './OrdersPagination';
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
      <OrdersPagination />

      <hr className="my-1 mx-4 mb-4" />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {orderHistory.length > 0 ? (
            orderHistory.map((item) => <OrderItem key={item.id} {...item} />)
          ) : (
            <>
              <div className="d-flex flex-md-row justify-content-center py-4 m-0">
                <span>
                  <img
                    height={300}
                    src={ShoppingBenefits}
                    alt="shopper-benefits"
                  />
                </span>
              </div>
              <div className="d-flex justify-content-center p-4 m-0">
                {/* <div className="p-2 bd-highlight"> */}
                <h2>No haz realizado compras a&uacute;n</h2>
                {/* </div> */}
                <div className="p-2 bd-highlight">
                  <h4>
                    ¡Encuentra los productos de tus tiendas favoritas cerca de
                    ti!
                  </h4>
                </div>
              </div>
              <div className="d-flex justify-content-center p-4 m-0">
                {/* <div className="p-2 bd-highlight"> */}
                <h4>
                  ¡Encuentra los productos de tus tiendas favoritas cerca de ti!
                </h4>
                {/* </div> */}
              </div>
              <div className="d-flex flex-md-row justify-content-center p-4">
                <div className="p-2 bd-highlight">
                  <Link className="btn btn-danger btn-lg" to="/">
                    Comprar ahora
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersHistory;
