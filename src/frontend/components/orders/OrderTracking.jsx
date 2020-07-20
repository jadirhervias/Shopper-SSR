/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from '../../firebase/firebaseInit';
import { setCurrentOrder } from '../../actions/orderAction';

const OrderTracking = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { databaseRef } = useContext(FirebaseContext);

  useEffect(() => {
    console.log('payment modal mounted!');
    // if (Object.keys(order).length !== 0 && databaseRef !== null) {

    const ordersRef = databaseRef
      .child('orders')
      .orderByChild('customer/id')
      .equalTo(user.id)
      .limitToFirst(1);

    // ordersRef.once('value', function (dataSnapshot) {
    //   console.log('VALUE EVENT');
    //   console.log(`Firebase key ${ dataSnapshot.val().firebaseDbReferenceKey}`);
    //   console.log(dataSnapshot.val());
    //   dispatch(setCurrentOrder(dataSnapshot.val()));
    // });

    ordersRef.on('child_added', function (childSnapshot, prevChildKey) {
      dispatch(setCurrentOrder(childSnapshot.val()));
    });

    ordersRef.on('child_changed', function (childSnapshot, prevChildKey) {
      // Like child remove Event
      if (
        childSnapshot.val().state !== 0 &&
        childSnapshot.val().state !== 1 &&
        childSnapshot.val().state !== 2
      ) {
        dispatch(setCurrentOrder({}));
      } else {
        dispatch(setCurrentOrder(childSnapshot.val()));
      }
    });

    ordersRef.on('child_removed', function (childSnapshot, prevChildKey) {
      dispatch(setCurrentOrder({}));
    });

    // } else {
    return () => {
      console.log('payment modal unmounted!');
      // ordersRef.off('value');
      ordersRef.off('child_added');
      ordersRef.off('child_changed');
      ordersRef.off('child_removed');
    };
    // }
  }, []);

  return (
    <div>
      <div>
        <h4>
          Order ID:
          {order.id}
        </h4>
        <div>
          <h4>Order state</h4>
          {order.state === 0
            ? 'Orden pendiente'
            : order.state === 1
            ? 'Orden tomada... tu pedido esta en camino'
            : order.state === 2
            ? 'Tu orden ha llegado. Anda a recibirlo!'
            : order.state !== 0 || order.state !== 1 || order.state !== 2
            ? 'No hay órdenes pendientes'
            : ''}
        </div>
        <div>
          <h4>Order Info</h4>
          {order.totalCost}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
