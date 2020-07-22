import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MdMyLocation } from 'react-icons/md';
import { searchRequest } from '../../actions';
import left from '../../assets/static/search-izq.png';
import right from '../../assets/static/search-der.png';
import '../../assets/styles/components/Search.scss';

const Search = (props) => {
  const [searchInput, doSearch] = useState({
    searching: '',
  });

  const handleInput = (event) => {
    event.preventDefault();

    doSearch({
      ...searchInput,
      [event.target.name]: event.target.value.trim(),
    });
  };

  // eslint-disable-next-line react/destructuring-assignment
  props.searchRequest(searchInput);

  return (
    <section className="main">
      {/* ¿Dónde quieres comprar hoy? */}
      <div className="jumbotron jumbotron-fluid main__container">
        <div className="d-flex flex-lg-row justify-content-between">
          <div className="p-2 bd-highlight">
            <img
              src={left}
              className="search-decoration-image img-fluid"
              alt="bg-1"
            />
          </div>
          <div className="bd-highlight text-center main__container--middle-content">
            <div className="d-flex flex-lg-row main__container--title justify-content-center mb-1 px-5">
              <h1>Quédate en casa, nosotros nos encargamos</h1>
            </div>
            <div className="d-flex flex-lg-row justify-content-center mb-5 px-5">
              <h4 className="main__container--subtitle my-5">
                Obtén tus compras del supermercado o mercado favorito en menos
                de una hora
              </h4>
            </div>
            <div className="d-flex flex-lg-row main__container--search-form">
              <div className="input-group">
                <input
                  name="searching"
                  type="text"
                  placeholder="¿D&oacute;nde quieres comprar hoy?"
                  aria-label="¿D&oacute;nde quieres comprar hoy?"
                  aria-describedby="basic-addon2"
                  className="form-control main__container--input-search"
                  autoComplete="off"
                  onChange={handleInput}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-info btn-lg"
                    data-toggle="modal"
                    data-target="#modalGoogleMapsSearch"
                    aria-describedby="googleMapsSearchHelpBlock"
                  >
                    <MdMyLocation size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 bd-highlight">
            <img
              src={right}
              className="search-decoration-image img-fluid"
              alt="bg-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = {
  searchRequest,
};

export default connect(null, mapDispatchToProps)(Search);
