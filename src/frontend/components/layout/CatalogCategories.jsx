/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Category from '../shopping/Category';
import '../../assets/styles/components/SearchShoppingCar.scss';

const CatalogCategories = ({ children }) => {
  const currentShop = useSelector((state) => state.currentShop);

  return (
    <>
      <section className="catalogCategories">
        <div className="container px-0">
          <div className="row px-5 m-0">
            <div className="col-lg-3 catalogCategories__categoriesCard px-0 my-4">
              <div className="accordion" id="accordionCategories">
                <div className="card catalogCategories__categoriesCard--card shadow-sm">
                  <div className="card-body text-center">
                    <small className="card-title all-categories-tittle">
                      TODAS LAS CATEGORÍAS
                    </small>
                  </div>

                  {Object.entries(currentShop).length !== 0 &&
                  currentShop.categories &&
                  currentShop.categories.length > 0 ? (
                      currentShop.categories.map((category) => (
                        <Category key={category.id} {...category} />
                      ))
                    ) : (
                      <div className="text-center p-4">
                        No se encontraron categorías
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="col-lg-9 px-0">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

// Solo traigo los datos que necesito del state
// const mapStateToProps = (state) => {
//   return {
//   };
// };

export default CatalogCategories;
// export default connect(null, null)(ShoppingCar);
