import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Search from '../components/main/Search';
import Categories from '../components/home/Categories';
import Carousel from '../components/home/Carousel';
import CarouselItem from '../components/home/CarouselItem';
import Footer from '../components/layout/Footer';
// import { config } from '../../server/config/index';

import '../assets/styles/App.scss';

const App = () => {
  // [variable para guardar estado, función para actualizar el estado] = useState(valor para inicializar estado)
  const [productos, setProductos] = useState([]);

  const apiHost = 'https://shopper-api-demo.herokuapp.com/api/v1/products';

  // useEffect(función efecto, listener de props que cambien) // Si no hay listener -> bucle infinito
  useEffect(() => {
    fetch(apiHost)
      .then((response) => response.json)
      .then((data) => setProductos(data));
  }, []);

  console.log(`API: ${apiHost}`);

  console.log('productos: ');
  console.log(productos);

  return (
    <div className="app">
      <Header />
      <Search />

      <Categories title="Productos de primera necesidad">
        <Carousel>
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
        </Carousel>
      </Categories>

      <Categories title="Productos enlatados">
        <Carousel>
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
        </Carousel>
      </Categories>

      <Categories title="Chocolates y dulces">
        <Carousel>
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
        </Carousel>
      </Categories>

      <Footer />
    </div>
  );
};

export default App;
