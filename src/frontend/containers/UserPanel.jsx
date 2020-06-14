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
import UserCards from '../components/userPanel/UserCards';
import UserShoppingCars from '../components/userPanel/UserShoppingCars';
import UserAccountData from '../components/userPanel/UserAccountData';
import '../assets/styles/components/UserPanel.scss';
// import motorcycleIcon from '../assets/static/motorcycle-icon.png';
import orderBillingIcon from '../assets/static/order-billing-icon.png';
import userPayMethodsIcon from '../assets/static/user-pay-methods-icon.png';
import shoppingCarGrayIcon from '../assets/static/shopping-car-gray.png';
import userSettingsIcon from '../assets/static/user-settings.png';

const UserPanel = () => {
  const dispatch = useDispatch();

  const showUserCards = useSelector((state) => state.showUserCards);
  const showUserOrders = useSelector((state) => state.showUserOrders);
  const showUserShoppingCars = useSelector(
    (state) => state.showUserShoppingCars
  );
  // const showUserAccount = useSelector(state => state.showUserAccount);

  const handleShowOrders = () => {
    dispatch(showUserAccountAction(false));
    dispatch(showUserShoppingCarsAction(false));
    dispatch(showUserCardsAction(false));
    dispatch(showUserOrdersAction(true));
  };

  const handleShowShoppingCars = () => {
    dispatch(showUserAccountAction(false));
    dispatch(showUserCardsAction(false));
    dispatch(showUserOrdersAction(false));
    dispatch(showUserShoppingCarsAction(true));
  };

  const handleShowCards = () => {
    dispatch(showUserAccountAction(false));
    dispatch(showUserShoppingCarsAction(false));
    dispatch(showUserOrdersAction(false));
    dispatch(showUserCardsAction(true));
  };

  const handleShowAccount = () => {
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
              <div className="card shadow-sm mb-4">
                <div className="card-body text-center mb-4">
                  <small className="card-title">DATOS DEL USUARIO</small>
                </div>
                <div className="card-body text-center mb-4">
                  <div
                    className="userPanel--option text-center mb-4 ml-4"
                    onClick={handleShowAccount}
                  >
                    <span className="icon-container">
                      <img
                        height={22}
                        src={userSettingsIcon}
                        alt="user-account"
                        className="mr-2"
                      />
                    </span>
                    Mi cuenta
                  </div>
                  <div
                    className="userPanel--option text-center mb-4 ml-4"
                    onClick={handleShowOrders}
                  >
                    <span className="icon-container">
                      <img
                        height={22}
                        src={orderBillingIcon}
                        alt="user-orders"
                        className="mr-2"
                      />
                    </span>
                    Pedidos
                  </div>
                  <div
                    className="userPanel--option text-center mb-4 ml-4"
                    onClick={handleShowShoppingCars}
                  >
                    <span className="icon-container">
                      <img
                        height={22}
                        src={shoppingCarGrayIcon}
                        alt="user-shoppingcars"
                        className="mr-2"
                      />
                    </span>
                    Carritos de compra
                  </div>
                  <div
                    className="userPanel--option text-center mb-4 ml-4"
                    onClick={handleShowCards}
                  >
                    <span className="icon-container">
                      <img
                        height={22}
                        src={userPayMethodsIcon}
                        alt="pay-methods"
                        className="mr-2"
                      />
                    </span>
                    Medios de pago
                  </div>
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
