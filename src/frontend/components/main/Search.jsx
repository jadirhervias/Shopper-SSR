/* eslint-disable no-unused-vars */
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchRequest } from '../../actions';
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
      <div className="search__container text-center">
        <h2 className="search__container--title">¿Dónde te ubicamos?</h2>
        <input
          name="searching"
          type="text"
          className="search__container--form--input-search"
          placeholder="Ingresa lo que buscas"
          autoComplete="off"
          onChange={handleInput}
        />
      </div>
    </section>
  );
};

const mapDispatchToProps = {
  searchRequest,
};

export default connect(null, mapDispatchToProps)(Search);
