/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/components/DeliveryInfo.scss';
import deliveryInfo from '../../assets/static/delivery-info.png';

const DeliveryInfo = () => {
  // $('#shoppingNowButton').click(function () {
  //   $('html,body')
  //     .animate({
  //       scrollTop: $('#availableShops')
  //         .offset().top
  //     }, 2000);
  // });

  return (
    <section className="deliveryInfo">
      <div className="container">
        <div className="row justify-content-md-center align-items-center m-0">
          <div className="col-md-4 deliveryInfo__content text-center p-0">
            <h4>Entregas rápidas, seguras e higiénicas</h4>
            {/* <Link
              className="deliveryInfo__content--button btn btn-md mt-2"
              id="shoppingNowButton"
              to="/"
            >
              Hacer compras ya
            </Link> */}
          </div>
          <div className="col-md-8 p-0 deliveryInfo__image">
            <img
              src={deliveryInfo}
              className="search-decoration-image img-fluid"
              alt="delivery-info-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
