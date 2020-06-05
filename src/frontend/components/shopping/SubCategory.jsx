/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch } from 'react-redux';
import { showProducts } from '../../actions/shoppingActions';
// import { connect } from 'react-redux';

const SubCategory = ({ id, name }) => {
  const dispatch = useDispatch();

  const handleShowProducts = (id) => {
    console.log(
      'Se modificará el state de productos, se borraran los filtros, y por ende cambiará las vista'
    );
    dispatch(showProducts(id));
  };

  return (
    <p>
      <a className="btn btn-light" onClick={() => handleShowProducts(id)}>
        {name}
      </a>
    </p>
  );
};

export default SubCategory;
