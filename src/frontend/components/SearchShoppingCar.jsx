/* eslint-disable no-unused-vars */
import React from 'react';
// import { connect } from 'react-redux';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
// import Search from './home/Search'
import ShoppingCar from '../assets/static/shopping-car.png';
import '../assets/styles/components/SearchShoppingCar.scss';

const SearchShoppingCar = (props) => {
  return (
    <section className="searchShoppingCar">
      <div className="container px-0">
        <div className="row justify-content-center py-2 pl-2 pr-5  mx-0">
          <div className="col-lg-4 col-md-0 text-center px-0" />
          <div className="col-lg-8 col-md-12 text-center px-0">
            <div className="input-group">
              <input
                type="text"
                placeholder="Buscar producto por nombre"
                aria-label="Buscar producto por nombre"
                aria-describedby="button-addon2"
                className="form-control mr-5 searchShoppingCar__container--input-search"
              />
              <div className="input-group-append">
                <button
                  className="btn searchShoppingCar__container--button-shoppingCar"
                  type="button"
                  id="button-addon2"
                >
                  <span>
                    <img
                      height={24}
                      src={ShoppingCar}
                      alt="carrito de compras"
                      className="mr-2"
                    />
                  </span>
                  <strong>Carrito de compras</strong>
                </button>
                <span className="shopping-car-counter input-group-text m-0">
                  <strong>12</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Solo traigo los datos que necesito del state
// const mapStateToProps = (state) => {
//   return {
//   };
// };

export default SearchShoppingCar;
// export default connect(null, null)(ShoppingCar);
