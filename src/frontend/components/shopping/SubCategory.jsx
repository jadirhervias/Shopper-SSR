/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch } from 'react-redux';
import { showProducts } from '../../actions/shoppingActions';
// import { connect } from 'react-redux';

const SubCategory = ({ id, name }) => {
  const dispatch = useDispatch();

  const handleShowProducts = (id) => {
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
