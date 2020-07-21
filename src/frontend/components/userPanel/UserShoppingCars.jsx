/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCarItem from './ShoppingCarItem';
import ShoppingCarsPagination from './ShoppingCarsPagination';
import Spinner from '../layout/Spinner';
import { paginateUserShoppingCars } from '../../actions/userActions';
import ShoppingBenefits from '../../assets/static/shopper-benefits.png';

const UserShoppingCars = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);
  const savedShoppingCars = useSelector((state) => state.savedShoppingCars);

  useEffect(() => {
    dispatch(paginateUserShoppingCars(user.id));
  }, [dispatch]);

  return (
    <div className="container">
      <ShoppingCarsPagination />

      <hr className="my-1 mx-4 mb-4" />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {savedShoppingCars.length > 0 ? (
            <>
              {savedShoppingCars.map((item) => (
                <ShoppingCarItem key={item.id} {...item} />
              ))}
            </>
          ) : (
            <>
              <div className="row justify-content-center py-4 m-0">
                <span>
                  <img
                    height={300}
                    src={ShoppingBenefits}
                    alt="shopper-benefits"
                  />
                </span>
              </div>
              <div className="row justify-content-center p-4 m-0">
                <h2>No haz realizado compras aún</h2>
                <h4>
                  ¡Encuentra los productos de tus tiendas favoritas cerca de ti!
                </h4>
              </div>
              <div className="row justify-content-center p-4">
                <button type="button" className="btn btn-danger btn-lg">
                  Comprar ahora
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserShoppingCars;
