import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import '../assets/styles/components/Products.scss';

const Products = (props) => {
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
        <div className="d-flex flex-md-row flex-wrap align-content-center px-4 pb-4 pt-2">
          {/* Filtros */}
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
                <a className="dropdown-item" href="/productos">
                  Nestle
                </a>
                <a className="dropdown-item" href="/productos">
                  Gloria
                </a>
                <a className="dropdown-item" href="/productos">
                  Angel
                </a>
                <a className="dropdown-item" href="/productos">
                  Campomar
                </a>
              </div>
            </div>
            : Nestle
          </div>
          <div className="p-2 bd-highlight">
            <div className="btn-group mr-1">
              <button
                className="btn btn-danger btn-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Formato
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/productos">
                  Envase
                </a>
                <a className="dropdown-item" href="/productos">
                  Pote
                </a>
                <a className="dropdown-item" href="/productos">
                  Caja
                </a>
              </div>
            </div>
            : Envase
          </div>
          <div className="p-2 flex-grow-1 bd-highlight" />
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
                <a className="dropdown-item" href="/productos">
                  Mayor precio
                </a>
                <a className="dropdown-item" href="/productos">
                  Menor precio
                </a>
                <a className="dropdown-item" href="/productos">
                  Producto
                </a>
                <a className="dropdown-item" href="/productos">
                  Stock
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de detalles de producto */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="row justify-content-end">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 text-center">
                      <figure className="m-0 p-0">
                        <img src="http://placehold.it/250x350" alt="producto" />
                      </figure>
                    </div>
                    <div className="col-md-6">
                      <div className="row py-2">
                        <div className="col-md-12">Rating Stars</div>
                      </div>
                      <div className="row py-2">
                        <div className="col-md-12">
                          <h2 className="font-weight-bold">
                            Nombre del Producto
                          </h2>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="col-md-6 text-left">
                          <h5>S/. 12.00</h5>
                        </div>
                        <div className="col-md-6 text-right">
                          <small>Formato/volúmen</small>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="col-md-12 text-center">
                          <button
                            type="button"
                            className="btn btn-lg btn-danger modal__add-to-car-button"
                          >
                            Agregar al carrito
                          </button>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="col-md-12">
                          <p className="text-left text-break">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <small className="text-muted">Más detalles</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-1 mx-4" />

        <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-xs-1 p-4 m-0">
          <div className="p-2 m-0">
            <div className="col products__container--product p-0">
              <div
                className="card h-80 product-content-scalable p-0 m-0"
                key={{}}
                id="idProduct"
              >
                <figure className="m-0">
                  <img
                    src="http://placehold.it/200x150"
                    className="card-img-top"
                    alt="wwww"
                  />
                </figure>
                <div className="card-body text-center products__container--product-info m-0">
                  <h5 className="card-title">Producto</h5>
                  <Link
                    to="/productos"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Ver detalles
                  </Link>
                </div>
                <div className="card-footer text-center m-0">
                  <small className="product-cost">S/.12.00</small>
                </div>
              </div>

              <div
                className="text-center products__container--add-to-cart bg-danger m-0 p-1"
                id="idProductButton"
              >
                <button className="btn" type="button" onClick={() => {}}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>

          <div className="p-2 m-0">
            <div className="col products__container--product p-0">
              <div
                className="card h-80 product-content-scalable p-0 m-0"
                key={{}}
                id="idProduct"
              >
                <figure className="m-0">
                  <img
                    src="http://placehold.it/200x150"
                    className="card-img-top"
                    alt="wwww"
                  />
                </figure>
                <div className="card-body text-center products__container--product-info m-0">
                  <h5 className="card-title">Producto</h5>
                  <Link to="/productos">Ver detalles</Link>
                </div>
                <div className="card-footer text-center m-0">
                  <small className="product-cost">S/.12.00</small>
                </div>
              </div>

              <div
                className="text-center products__container--add-to-cart bg-danger m-0 p-1"
                id="idProductButton"
              >
                <button className="btn" type="button" onClick={() => {}}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>

          <div className="p-2 m-0">
            <div className="col products__container--product p-0">
              <div
                className="card h-80 product-content-scalable p-0 m-0"
                key={{}}
                id="idProduct"
              >
                <figure className="m-0">
                  <img
                    src="http://placehold.it/200x150"
                    className="card-img-top"
                    alt="wwww"
                  />
                </figure>
                <div className="card-body text-center products__container--product-info m-0">
                  <h5 className="card-title">Producto</h5>
                  <Link to="/productos">Ver detalles</Link>
                </div>
                <div className="card-footer text-center m-0">
                  <small className="product-cost">S/.12.00</small>
                </div>
              </div>

              <div
                className="text-center products__container--add-to-cart bg-danger m-0 p-1"
                id="idProductButton"
              >
                <button className="btn" type="button" onClick={() => {}}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>

          <div className="p-2 m-0">
            <div className="col products__container--product p-0">
              <div
                className="card h-80 product-content-scalable p-0 m-0"
                key={{}}
                id="idProduct"
              >
                <figure className="m-0">
                  <img
                    src="http://placehold.it/200x150"
                    className="card-img-top"
                    alt="wwww"
                  />
                </figure>
                <div className="card-body text-center products__container--product-info m-0">
                  <h5 className="card-title">Producto</h5>
                  <Link to="/productos">Ver detalles</Link>
                </div>
                <div className="card-footer text-center m-0">
                  <small className="product-cost">S/.12.00</small>
                </div>
              </div>

              <div
                className="text-center products__container--add-to-cart bg-danger m-0 p-1"
                id="idProductButton"
              >
                <button className="btn" type="button" onClick={() => {}}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>

          <div className="p-2 m-0">
            <div className="col products__container--product p-0">
              <div
                className="card h-80 product-content-scalable p-0 m-0"
                key={{}}
                id="idProduct"
              >
                <figure className="m-0">
                  <img
                    src="http://placehold.it/200x150"
                    className="card-img-top"
                    alt="wwww"
                  />
                </figure>
                <div className="card-body text-center products__container--product-info m-0">
                  <h5 className="card-title">Producto</h5>
                  <Link to="/productos">Ver detalles</Link>
                </div>
                <div className="card-footer text-center m-0">
                  <small className="product-cost">S/.12.00</small>
                </div>
              </div>

              <div
                className="text-center products__container--add-to-cart bg-danger m-0 p-1"
                id="idProductButton"
              >
                <button className="btn" type="button" onClick={() => {}}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>

          <div className="p-2 m-0">
            <div className="col products__container--product p-0">
              <div
                className="card h-80 product-content-scalable p-0 m-0"
                key={{}}
                id="idProduct"
              >
                <figure className="m-0">
                  <img
                    src="http://placehold.it/200x150"
                    className="card-img-top"
                    alt="wwww"
                  />
                </figure>
                <div className="card-body text-center products__container--product-info m-0">
                  <h5 className="card-title">Producto</h5>
                  <Link to="/productos">Ver detalles</Link>
                </div>
                <div className="card-footer text-center m-0">
                  <small className="product-cost">S/.12.00</small>
                </div>
              </div>

              <div
                className="text-center products__container--add-to-cart bg-danger m-0 p-1"
                id="idProductButton"
              >
                <button className="btn" type="button" onClick={() => {}}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
