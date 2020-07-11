/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
// import * as firebase from 'firebase';
// import { databaseRootRef } from '../../firebase/cloudMessaging';

const OrderTracking = () => {
  const order = useSelector((state) => state.order);

  // useEffect(() => {
  //   const ordersRef = databaseRootRef.child('orders');

  //   console.log('DATABASE INIT');

  //   if (order) {
  //     ordersRef.child(order).on('child_added', function (childSnapshot, prevChildKey) {
  //       console.log('CHILD ADDED EVENT');
  //       console.log(childSnapshot.val());
  //     });
  //   }
  // }, [order]);

  return (
    <div>
      {Object.keys(order).length !== 0 ? (
        <>
          <h4>
            Order ID:
            {order.id}
          </h4>
          <div>
            <h4>Order state</h4>
            {order.state === 0 ?
              'Orden pendiente' :
              order.state === 1 ?
                'Orden tomada... tu pedido esta en camino' :
                order.state === 2 ?
                  'Tu orden ha llegado. Anda a recibirlo!' :
                  order.state !== 0 || order.state !== 1 || order.state !== 2 ?
                    'No hay órdenes pendientes' :
                    ''}
          </div>
          <div>
            <h4>Order Info</h4>
            {order.totalCost}
          </div>
        </>
      ) : (
        'No tiene una orden pendiente'
      )}
    </div>
  );
};

export default OrderTracking;
