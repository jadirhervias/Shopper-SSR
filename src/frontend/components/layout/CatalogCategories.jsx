/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import '../../assets/styles/components/SearchShoppingCar.scss';

const CatalogCategories = ({ children }) => {
  return (
    <>
      <section className="catalogCategories">
        <div className="container px-0">
          <div className="row px-5 m-0">
            <div className="col-lg-3 catalogCategories__categoriesCard px-0 my-4">
              <div className="accordion" id="accordionExample">
                <div className="card catalogCategories__categoriesCard--card shadow">
                  <div className="card-body">
                    <small className="card-title all-categories-tittle">
                      TODAS LAS CATEGORÍAS
                    </small>
                  </div>

                  <div className="card-body" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        className="btn"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Lácteos y huevos
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        <Link to="/productos">Leche</Link>
                      </p>
                      <p>
                        <Link to="/productos">Yogures</Link>
                      </p>
                      <p>
                        <Link to="/productos">Quesos</Link>
                      </p>
                      <p>
                        <Link to="/productos">Derivados de la leche</Link>
                      </p>
                      <p>
                        <Link to="/productos">Huevos de granja</Link>
                      </p>
                    </div>
                  </div>

                  <div className="card-body" id="headingTwo">
                    <h2 className="mb-0">
                      <button
                        className="btn"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        Despensa
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        <Link to="/productos">Leche</Link>
                      </p>
                      <p>
                        <Link to="/productos">Yogures</Link>
                      </p>
                      <p>
                        <Link to="/productos">Quesos</Link>
                      </p>
                      <p>
                        <Link to="/productos">Derivados de la leche</Link>
                      </p>
                      <p>
                        <Link to="/productos">Huevos de granja</Link>
                      </p>
                    </div>
                  </div>

                  <div className="card-body" id="headingThree">
                    <h2 className="mb-0">
                      <button
                        className="btn"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        Frutas y verduras
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        <Link to="/productos">Leche</Link>
                      </p>
                      <p>
                        <Link to="/productos">Yogures</Link>
                      </p>
                      <p>
                        <Link to="/productos">Quesos</Link>
                      </p>
                      <p>
                        <Link to="/productos">Derivados de la leche</Link>
                      </p>
                      <p>
                        <Link to="/productos">Huevos de granja</Link>
                      </p>
                    </div>
                  </div>

                  <div className="card-body" id="headingFour">
                    <h2 className="mb-0">
                      <button
                        className="btn"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseFour"
                        aria-expanded="true"
                        aria-controls="collapseFour"
                      >
                        Hogar
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseFour"
                    className="collapse"
                    aria-labelledby="headingFour"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        <Link to="/productos">Leche</Link>
                      </p>
                      <p>
                        <Link to="/productos">Yogures</Link>
                      </p>
                      <p>
                        <Link to="/productos">Quesos</Link>
                      </p>
                      <p>
                        <Link to="/productos">Derivados de la leche</Link>
                      </p>
                      <p>
                        <Link to="/productos">Huevos de granja</Link>
                      </p>
                    </div>
                  </div>
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
