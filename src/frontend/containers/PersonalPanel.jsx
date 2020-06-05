import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ShoppingCar from '../components/personalPanel/ShoppingCar';

const PersonalPanel = () => (
  <>
    <Header />
    <main>
      <ShoppingCar />
    </main>
    <Footer />
  </>
);

export default PersonalPanel;
