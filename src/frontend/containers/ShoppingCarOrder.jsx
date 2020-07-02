import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/layout/Breadcrumb';
import ShoppingCar from '../components/shoppingCarOrder/ShoppingCar';

const ShoppingCarOrder = () => (
  <>
    <Header />
    <main>
      <Breadcrumb />
      <ShoppingCar />
    </main>
    <Footer />
  </>
);

export default ShoppingCarOrder;
