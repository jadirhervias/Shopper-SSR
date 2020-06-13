/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import orderDeliveredIcon from '../../assets/static/order-delivered-icon.png';
import orderCanceledIcon from '../../assets/static/order-canceled-icon.png';
import orderInProgressIcon from '../../assets/static/order-in-progress-icon.png';
import '../../assets/styles/components/OrderItem.scss';

const OrderItem = (order) => {
  const dispatch = useDispatch();

  return (
    <div className="card h-80 mb-3">
      <div className="row no-gutters">
        <div className="col-md-5 col-sm-6">
          <div className="card-body">
            <h6 className="card-title">{order.id}</h6>
            <p className="card-title">{order.address}</p>
            <p className="card-text">
              <small className="text-muted">{order.date}</small>
            </p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card-body">
            <h4 className="card-title">
              S/.
              {order.cost}
            </h4>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card-body">
            <div className="row justify-content-center align-items-center m-0 p-0">
              <div className="col-sm-12 text-center">
                <img
                  src={
                    order.state === 1 ?
                      orderDeliveredIcon :
                      order.state === 2 ?
                        orderInProgressIcon :
                        orderCanceledIcon
                  }
                  alt={
                    order.state === 1 ?
                      'order-delivered' :
                      order.state === 2 ?
                        'order-canceled' :
                        'order-in-progress'
                  }
                />
                <h5
                  className={
                    order.state === 1 ?
                      'order-delivered-text' :
                      order.state === 2 ?
                        'order-in-progress-text' :
                        'order-canceled-text'
                  }
                >
                  {order.state === 1 ?
                    'Pedido entregado' :
                    order.state === 2 ?
                      'Pedido en progreso' :
                      'Pedido cancelado'}
                </h5>
              </div>
              <p className="card-text">
                <small
                  className="text-muted product-detail--link"
                  onClick={() => {}}
                >
                  Ver detalles de facturaci&oacute;n
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
