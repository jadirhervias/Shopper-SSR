import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ShoppingCar from '../components/shoppingCarOrder/ShoppingCar';

const ShoppingCarOrder = () => (
  <>
    <Header />
    <main>
      <ShoppingCar />
    </main>
    <Footer />
  </>
);

export default ShoppingCarOrder;
