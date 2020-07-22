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
    <div className="d-flex flex-column justify-content-center bd-highlight m-2">
      <div className="p-2 w-100 bd-highlight">
        <h4>
          {order.state === 0
            ? 'Orden pendiente'
            : order.state === 1
            ? 'Orden tomada... tu pedido esta en camino'
            : order.state === 2
            ? 'Tu orden ha llegado. Anda a recibirla!'
            : order.state !== 0 || order.state !== 1 || order.state !== 2
            ? 'No hay órdenes pendientes'
            : ''}
        </h4>
      </div>
      <div className="px-2 w-100 bd-highlight">
        <small>{`ID: ${order.id}`}</small>
      </div>
      <div className="p-2 w-100 bd-highlight">
        <strong>Monto: </strong>
        {`S/. ${order.totalCost / 100}${
          (order.totalCost / 100) % 1 === 0 ? '.00' : ''
        }`}
      </div>
    </div>
  );
};

export default OrderTracking;
