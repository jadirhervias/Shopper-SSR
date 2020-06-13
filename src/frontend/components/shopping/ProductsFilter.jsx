/* eslint-disable react/button-has-type */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterProducts,
  sortProductsAction,
} from '../../actions/productsActions';

const ProductsFilter = () => {
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const handleFilter = (brand) => {
    dispatch(filterProducts(brand));
  };

  /*
    SORT INDEX:
    1: Sort by higher cost
    2: Sort by lower cost
    3: Sort by product name
    4: Sort by product stock
  */
  const handleSort = (sortIndex) => {
    dispatch(sortProductsAction(sortIndex));
  };

  return (
    <>
      <div className="d-flex flex-md-row flex-wrap align-content-center px-4 pb-4 pt-2">
        {/* Filters */}
        <div className="p-2 bd-highlight">
          <div className="btn-group mr-1">
            <button
              className="btn btn-danger btn-sm dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Marca
            </button>
            <div className="dropdown-menu">
              {products.filterIndex && (
                <button
                  className="dropdown-item"
                  onClick={() => handleFilter(null)}
                >
                  Quitar filtro
                </button>
              )}
              {Object.keys(
                products.productsList.reduce((accumulator, productItem) => {
                  accumulator[productItem.brand] =
                    (accumulator[productItem.brand] || 0) + 1;
                  return accumulator;
                }, {})
              ).map((item) => (
                <button
                  key={item}
                  className="dropdown-item"
                  onClick={() => handleFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            {` : ${
              products.filterIndex ? products.filterIndex : 'Sin filtros'
            }`}
          </div>
        </div>
        <div className="p-2 flex-grow-1 bd-highlight" />
        {/* Sort */}
        <div className="p-2 bd-highlight">
          <div className="btn-group">
            <button
              className="btn btn-danger btn-sm dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Ordenar por
            </button>
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => handleSort(1)}>
                Mayor precio
              </button>
              <button className="dropdown-item" onClick={() => handleSort(2)}>
                Menor precio
              </button>
              <button className="dropdown-item" onClick={() => handleSort(3)}>
                Producto
              </button>
              <button className="dropdown-item" onClick={() => handleSort(4)}>
                Stock
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsFilter;
