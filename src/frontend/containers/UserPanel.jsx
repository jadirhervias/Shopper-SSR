/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {
  showUserOrdersAction,
  showUserShoppingCarsAction,
  showUserCardsAction,
  showUserAccountAction,
} from '../actions/userActions';
import OrdersHistory from '../components/userPanel/OrdersHistory';
import '../assets/styles/components/UserPanel.scss';
import UserCards from '../components/userPanel/UserCards';
import UserShoppingCars from '../components/userPanel/UserShoppingCars';
import UserAccountData from '../components/userPanel/UserAccountData';

const UserPanel = () => {
  const dispatch = useDispatch();

  const showUserCards = useSelector((state) => state.showUserCards);
  const showUserOrders = useSelector((state) => state.showUserOrders);
  const showUserShoppingCars = useSelector(
    (state) => state.showUserShoppingCars
  );
  // const showUserAccount = useSelector(state => state.showUserAccount);

  const handleShowOrders = (event) => {
    // event.prevetnDefault();

    dispatch(showUserAccountAction(false));
    dispatch(showUserShoppingCarsAction(false));
    dispatch(showUserCardsAction(false));
    dispatch(showUserOrdersAction(true));
  };

  const handleShowShoppingCars = (event) => {
    // event.prevetnDefault();

    dispatch(showUserAccountAction(false));
    dispatch(showUserCardsAction(false));
    dispatch(showUserOrdersAction(false));
    dispatch(showUserShoppingCarsAction(true));
  };

  const handleShowCards = (event) => {
    // event.prevetnDefault();

    dispatch(showUserAccountAction(false));
    dispatch(showUserShoppingCarsAction(false));
    dispatch(showUserOrdersAction(false));
    dispatch(showUserCardsAction(true));
  };

  const handleShowAccount = (event) => {
    // event.prevetnDefault();

    dispatch(showUserShoppingCarsAction(false));
    dispatch(showUserOrdersAction(false));
    dispatch(showUserCardsAction(false));
    dispatch(showUserAccountAction(true));
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="row my-4">
            <div className="col-lg-3">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <small className="card-title">DATOS DEL USUARIO</small>
                </div>
                <div className="card-body text-center">
                  <p className="userPanel--option" onClick={handleShowAccount}>
                    Mi cuenta
                  </p>
                  <p className="userPanel--option" onClick={handleShowOrders}>
                    Pedidos
                  </p>
                  <p
                    className="userPanel--option"
                    onClick={handleShowShoppingCars}
                  >
                    Carritos de compra
                  </p>
                  <p className="userPanel--option" onClick={handleShowCards}>
                    Medios de pago
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              {showUserOrders ? (
                <OrdersHistory />
              ) : showUserShoppingCars ? (
                <UserShoppingCars />
              ) : showUserCards ? (
                <UserCards />
              ) : (
                <UserAccountData />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserPanel;
