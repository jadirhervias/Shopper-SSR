/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FiX, FiFilter } from 'react-icons/fi';
// import { connect } from 'react-redux';
import '../../assets/styles/components/Sidebar.scss';

const SideBar = (props) => {
  return (
    <>
      <input type="checkbox" id="show-filter" />
      <label htmlFor="show-filter" className="sidebar__show">
        <FiFilter className="filter__open" />
        <FiX className="filter__close" />
      </label>
      <aside className="sidebar">
        <section className="categoriesList">
          <div className="sidebar__title">Filtros</div>
          <ul>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
            <li>
              <a href="/productos">
                <span>Categoría</span>
              </a>
            </li>
          </ul>
        </section>
      </aside>
    </>
  );
};

// Solo traigo los datos que necesito del state
// const mapStateToProps = (state) => {
//   return {
//   };
// };

export default SideBar;
// export default connect(null, null)(ShoppingCar);
