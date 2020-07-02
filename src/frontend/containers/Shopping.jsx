/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { connect } from 'react-redux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/layout/Breadcrumb';
import SearchShoppingCar from '../components/shopping/SearchShoppingCar';
import CatalogCategories from '../components/shopping/CatalogCategories';
import Products from '../components/shopping/Products';
import '../assets/styles/App.scss';

const Shopping = (props) => {
  return (
    <>
      <Header />
      {/* TODO: No mostrar card de categorias si no hay */}
      <main>
        <SearchShoppingCar />
        <Breadcrumb />
        <CatalogCategories>
          <Products />
        </CatalogCategories>
      </main>
      <Footer />
    </>
  );
};

// Solo traigo los datos que necesito del state
// const mapStateToProps = (state) => {
//   return {
//   };
// };

export default Shopping;
// export default connect(null, null)(Shopping);
