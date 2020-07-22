import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCarCounter from './ShoppingCarCounter';
import {
  setSearchProductsMatch,
  showProducts,
} from '../../actions/shoppingActions';
import '../../assets/styles/components/SearchShoppingCar.scss';

const SearchShoppingCar = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const handleChange = (e) => {
    const product = e.target.value.trim();
    if (product !== '') {
      dispatch(setSearchProductsMatch(products.subcategoryId, product));
    } else {
      dispatch(showProducts(products.subcategoryId));
    }
  };

  return (
    <section className="searchShoppingCar">
      <div className="container px-0">
        <div className="row justify-content-center py-2 pl-2 pr-5  mx-0">
          <div className="col-lg-4 col-md-0 text-center px-0" />
          <div className="col-lg-8 col-md-12 text-center px-0">
            <div className="input-group">
              <input
                type="text"
                placeholder={`Buscar producto en sección ${products.subcategoryName}`}
                aria-label={`Buscar producto en sección ${products.subcategoryName}`}
                aria-describedby="button-addon2"
                className="form-control searchShoppingCar__container--input-search mr-5"
                onChange={handleChange}
              />
              <ShoppingCarCounter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchShoppingCar;
('');
