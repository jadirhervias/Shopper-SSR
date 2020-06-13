/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardItem from './CardItem';

const UserCards = () => {
  const dispatch = useDispatch();

  const userPayMethods = useSelector((state) => state.userCards);

  // const userPayMethods = [
  //   {
  //     id: '3dde1r9187r019rn901r1m',
  //     // card_number: '4111111111111111',
  //     card_number: '411111******1111',
  //     cvv: '123',
  //     expiration_month: '09',
  //     expiration_year: '2020',
  //     email: 'jadir@gmail.com'
  //   },
  //   {
  //     id: '3dd89r9187r019rn2kkr1m',
  //     // card_number: '5111111111111118',
  //     card_number: '511111******1118',
  //     cvv: '123',
  //     expiration_month: '09',
  //     expiration_year: '2020',
  //     email: 'jadir@gmail.com'
  //   }
  // ]

  return (
    <div className="container">
      {userPayMethods.length > 0 ? (
        <>
          <div className="row justify-content-between p-2 m-0">
            <h2>Mis Medios de Pago</h2>
          </div>
          <hr className="mt-3 mb-4 mx-1" />
          {userPayMethods.map((item) => (
            <CardItem key={item.id} {...item} />
          ))}
        </>
      ) : (
        <>
          <div className="row justify-content-center p-4 m-0">
            <h2>No tienes m&eacute;todos de pago a&uacute;n</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCards;
