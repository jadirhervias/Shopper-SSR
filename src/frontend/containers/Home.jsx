/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect, useSelector } from 'react-redux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Search from '../components/home/Search';
import DeliveryInfo from '../components/home/DeliveryInfo';
import Shops from '../components/home/Shops';
import Carousel from '../components/home/Carousel';
import CarouselItem from '../components/home/CarouselItem';
import SearchMapModal from '../components/home/SearchMapModal';
import '../assets/styles/App.scss';

const Home = ({ myList, shops, searchResults }) => {
  const mapLoaded = useSelector((state) => state.mapLoaded);
  return (
    <>
      <Header />
      <Search />

      {mapLoaded && <SearchMapModal />}

      {searchResults.length > 0 && (
        <Shops title="Resultados de búsqueda">
          <Carousel>
            {searchResults.map((item) => (
              <CarouselItem key={item.id} {...item} parent="searchResults" />
            ))}
          </Carousel>
        </Shops>
      )}

      <DeliveryInfo />

      {/* 'isFav' es una prop usada para habilitar el botón eliminar y deshabilitar el boton agregar */}
      {myList.length > 0 && (
        <Shops title="Mis Tiendas preferidas">
          <Carousel>
            {myList.map((item) => (
              <CarouselItem key={item.id} {...item} isFav parent="myList" />
            ))}
          </Carousel>
        </Shops>
      )}

      {/* 'isList' es una prop usada para deshabilitar el botón de agregar a favs si ya lo está */}
      {shops.length > 0 && (
        <div className="p-0 m-0" id="availableShops">
          <Shops title="Tiendas afiliadas">
            <Carousel>
              {shops.map((item) => (
                <CarouselItem
                  key={item.id}
                  {...item}
                  isFav={false}
                  parent="shops"
                />
              ))}
            </Carousel>
          </Shops>
        </div>
      )}

      {/* TODO: Categoría de Tiendas y Supermercados Asociados */}
      <Footer />
    </>
  );
};

// Solo traigo los datos que necesito del state
const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    shops: state.shops,
    searchResults: state.searchResults,
  };
};

// export default Home;
export default connect(mapStateToProps, null)(Home);
