/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { connect } from 'react-redux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ShoppingCar from '../components/ShoppingCar';
import SideBar from '../components/layout/Sidebar';
import '../assets/styles/App.scss';
import Products from '../components/Products';

const Shopping = (props) => {
  return (
    <>
      <Header />
      <ShoppingCar />
      {/* <div className='row'> */}
      {/* <div className='col-md-3'> */}
      <SideBar />
      {/* </div> */}
      {/* <div className='col-md-9'> */}
      <Products />
      {/* </div> */}
      {/* </div> */}
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
