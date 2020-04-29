import React from 'react';
import '../../assets/styles/components/Search.scss';

const Search = () => (
  <section className="main">
    <h2 className="main__title">¿Dónde te ubicamos?</h2>
    <input type="text" className="input" placeholder="Ingresa tu ubicación" />
  </section>
);

export default Search;
