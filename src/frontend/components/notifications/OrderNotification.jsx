import React from 'react';
import logo from '../../assets/static/shopper-logo.png';

const OrderNotification = () => {
  return (
    // Toast for notification
    <div
      id="shopperNotification1"
      className="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-autohide="false"
      data-delay="10000"
    >
      <div className="toast-header">
        <img src={logo} className="rounded mr-2" alt="Shopper" />
        <strong className="mr-auto">Bootstrap</strong>
        <small className="text-muted">justo ahora</small>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">Tus compras han llegado!</div>
    </div>
  );
};

export default OrderNotification;
