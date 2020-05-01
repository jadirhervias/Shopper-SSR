import React from 'react';
import '../../assets/styles/components/Search.scss';

const Search = () => (
  <section className="main">
    {/* ¿Dónde quieres comprar hoy? */}
    <div className="search__container">
      <h2 className="search__container--title">¿Dónde te ubicas?</h2>
      <form action="/" className="main__form">
        <input
          type="text"
          className="main__form--input-search"
          placeholder="Ingresa tu ubicación"
        />
      </form>
    </div>
  </section>
);

export default Search;
