/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { showProducts } from '../../actions/shoppingActions';
import { FirebaseContext } from '../../firebase/firebaseInit';
// import { connect } from 'react-redux';

const SubCategory = ({ id, name }) => {
  const dispatch = useDispatch();
  const { storageRef } = useContext(FirebaseContext);

  const handleShowProducts = (id, subCategoryName, storageRef) => {
    dispatch(showProducts(id, 0, subCategoryName, storageRef));
  };

  return (
    <p>
      <a
        className="btn btn-light"
        onClick={() => handleShowProducts(id, name, storageRef)}
      >
        {name}
      </a>
    </p>
  );
};

export default SubCategory;
