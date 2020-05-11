/* eslint-disable no-unused-vars */
import React from 'react';
// import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../assets/styles/components/Products.scss';

const Products = (props) => {
  return (
    <section className="products">
      <div className="d-flex justify-content-md-between">
        <div className="d-flex flex-md-row">
          <div className="d-flex flex-column bd-highlight mb-3">
            Producto #1
          </div>
          <div className="d-flex flex-column bd-highlight mb-3">
            Producto #1
          </div>
          <div className="d-flex flex-column bd-highlight mb-3">
            Producto #1
          </div>
        </div>
        <div className="d-flex flex-md-row">
          <div className="d-flex flex-column bd-highlight mb-3">
            Producto #1
          </div>
          <div className="d-flex flex-column bd-highlight mb-3">
            Producto #1
          </div>
          <div className="d-flex flex-column bd-highlight mb-3">
            Producto #1
          </div>
        </div>
        <div className="d-flex flex-md-row">
          <div className="d-flex flex-column bd-highlight mb-3">
            Producto #1
          </div>
          <div className="d-flex flex-column bd-highlight mb-3">
            Producto #1
          </div>
          <div className="d-flex flex-column bd-highlight mb-3">
            Producto #1
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
