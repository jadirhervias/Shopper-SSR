/* eslint-disable no-unused-vars */
import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Search from './home/Search'
import ShoppingCar from './shopping/ShoppingCar';
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
              <ShoppingCar />
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
