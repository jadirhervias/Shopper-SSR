/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import ProductsFilter from './shopping/ProductsFilter';
import ProductDetailsModal from './shopping/ProductDetailsModal';
import ProductItem from './shopping/ProductItem';
// import { connect } from 'react-redux';
import '../assets/styles/components/Products.scss';

const Products = () => {
  const products = useSelector((state) => state.products);

  const sortIndexState = products.sortIndex;

  // SORT INDEX:
  // 1: Sort by higher cost
  const sortByHigherCost = (item1, item2) => {
    return item2.cost - item1.cost;
  };

  // 2: Sort by lower cost
  const sortByLowerCost = (item1, item2) => {
    return item1.cost - item2.cost;
  };

  // 3: Sort by product name
  const sortByName = (item1, item2) => {
    return item1.name.toString().localeCompare(item2.name);
  };

  // 4: Sort by product stock
  const sortByStock = (item1, item2) => {
    return item2.stock - item1.stock;
  };

  const sortList = (list, sort) => {
    // return list.map((filterItem) => {
    switch (sort) {
      case 0:
        return list;

      case 1:
        return list.sort(sortByHigherCost);

      case 2:
        return list.sort(sortByLowerCost);

      case 3:
        return list.sort(sortByName);

      case 4:
        return list.sort(sortByStock);

      default:
        return list;
    }
    // })
  };

  return (
    <section className="products">
      <div className="container">
        {/* Título de categoría y paginación */}
        <div className="d-flex flex-md-row flex-wrap align-content-center px-4 pt-4 pb-2">
          <div className="p-2 bd-highlight">
            {/* {props.categoria} */}
            <h2>Despensa</h2>
          </div>
          <div className="p-2 flex-grow-1 bd-highlight" />
          <div className="p-2 bd-highlight">
            <span className="align-middle">Mostrando 15 de 80 resultados</span>
          </div>
          <div className="p-2 bd-highlight">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className="page-item">
                  <a
                    className="page-link arrow-character"
                    href="/productos"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    {/* &laquo; */}
                    ❮
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link arrow-character" href="/productos">
                    {/* &raquo; */}
                    ❯
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* products__container--filters */}
        <ProductsFilter />

        <hr className="my-1 mx-4" />

        {products.productsList.length === 0 ? (
          <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-xs-1 p-4 m-0 justify-content-center">
            <div className="text-center p-4">
              Lo sentimos, no hay productos que mostrar
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-xs-1 p-4 m-0 justify-content-start">
            {
              // No filter No sort
              !products.filterIndex && !products.sortIndex ?
                products.productsList.map((product) => (
                  <ProductItem key={product.id} {...product} />
                )) : // Filter and sort
                products.filterIndex && products.sortIndex ?
                  sortList(
                    products.productsList.filter((item) =>
                      item.brand
                        .toLowerCase()
                        .includes(products.filterIndex.toLowerCase())
                    ),
                    sortIndexState
                  ).map((product) => (
                    <ProductItem key={product.id} {...product} />
                  )) : // Only filter
                  products.filterIndex && !products.sortIndex ?
                    products.productsList
                      .filter((item) =>
                        item.brand
                          .toLowerCase()
                          .includes(products.filterIndex.toLowerCase())
                      )
                      .map((product) => (
                        <ProductItem key={product.id} {...product} />
                      )) : // Only sort
                    products.sortIndex &&
                  !products.filterIndex &&
                  sortList(
                    products.productsList,
                    sortIndexState
                  ).map((product) => (
                    <ProductItem key={product.id} {...product} />
                  ))
            }
          </div>
        )}
        {/* ) :
          <div>Cargando...</div> */}

        {/* Modals de detalles de producto */}
        {
          // No filter No sort
          !products.filterIndex && !products.sortIndex ?
            products.productsList.map((product) => (
              <ProductDetailsModal key={product.id} {...product} />
            )) : // Filter and sort
            products.filterIndex && products.sortIndex ?
              sortList(
                products.productsList.filter((item) =>
                  item.brand
                    .toLowerCase()
                    .includes(products.filterIndex.toLowerCase())
                ),
                sortIndexState
              ).map((product) => (
                <ProductDetailsModal key={product.id} {...product} />
              )) : // Only filter
              products.filterIndex && !products.sortIndex ?
                products.productsList
                  .filter((item) =>
                    item.brand
                      .toLowerCase()
                      .includes(products.filterIndex.toLowerCase())
                  )
                  .map((product) => (
                    <ProductDetailsModal key={product.id} {...product} />
                  )) : // Only sort
                products.sortIndex &&
              !products.filterIndex &&
              sortList(products.productsList, sortIndexState).map((product) => (
                <ProductDetailsModal key={product.id} {...product} />
              ))
        }
      </div>
    </section>
  );
};

export default Products;
