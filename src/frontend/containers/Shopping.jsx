/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import { connect } from 'react-redux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../assets/styles/App.scss';
import ShoppingCar from '../components/ShoppingCar';
import SideBar from '../components/layout/Sidebar';

const Shopping = (props) => {
  return (
    <>
      <Header />
      <ShoppingCar />
      <SideBar />
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
