/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Search from '../components/main/Search';
import Features from '../components/home/Features';
import Categories from '../components/home/Categories';
import Carousel from '../components/home/Carousel';
import CarouselItem from '../components/home/CarouselItem';
import '../assets/styles/App.scss';

const Home = ({ myList, catalogs, searchResults }) => {
  return (
    <>
      <Header />
      <Search />
      <Features />

      {searchResults.length > 0 && (
        <Categories title="Resultados de búsqueda">
          <Carousel>
            {searchResults.map((item) => (
              <CarouselItem key={item.id} {...item} />
            ))}
          </Carousel>
        </Categories>
      )}

      {/* 'isFav' es una prop usada para habilitar el botón eliminar y deshabilitar el boton agregar */}
      {myList.length > 0 && (
        <Categories title="Mis Catálogos preferidos">
          <Carousel>
            {myList.map((item) => (
              <CarouselItem key={item.id} {...item} isFav parent="myList" />
            ))}
          </Carousel>
        </Categories>
      )}

      {/* 'isList' es una prop usada para deshabilitar el botón de agregar a favs si ya lo está */}
      <Categories title="Catálogos">
        <Carousel>
          {catalogs.map((item) => (
            <CarouselItem
              key={item.id}
              {...item}
              isFav={false}
              parent="catalogs"
            />
          ))}
        </Carousel>
      </Categories>

      {/* TODO: Categoría de Tiendas y Supermercados Asociados */}
      <Footer />
    </>
  );
};

// Solo traigo los datos que necesito del state
const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    catalogs: state.catalogs,
    searchResults: state.searchResults,
  };
};

// export default Home;
export default connect(mapStateToProps, null)(Home);
