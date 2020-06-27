import React from 'react';
import OrderNotification from './OrderNotification';
import '../../assets/styles/components/NotificationStack.scss';

const NotificationStack = () => {
  return (
    <>
      <div
        className="notification__container"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Position it */}
        <div className="notification__container--stack">
          {/* Then put toasts within */}

          <OrderNotification />

          {/* <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <img src={logo} className="rounded mr-2" alt="Shopper" />
              <strong className="mr-auto">Shopper</strong>
              <small className="text-muted">Hace 5 minutos</small>
              <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="toast-body">
              Tu shopper está en camino
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default NotificationStack;
