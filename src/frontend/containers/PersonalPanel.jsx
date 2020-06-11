import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ShoppingCarDetail from '../components/personalPanel/ShoppingCarDetail';

const PersonalPanel = () => (
  <>
    <Header />
    <main>
      <ShoppingCarDetail />
    </main>
    <Footer />
  </>
);

export default PersonalPanel;
