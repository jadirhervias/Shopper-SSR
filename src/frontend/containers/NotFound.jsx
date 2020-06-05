import React from 'react';
// import { Link } from 'react-router-dom';
import cannotFound404 from '../assets/static/404.png';
import '../assets/styles/components/NotFound.scss';

const NotFound = () => (
  // Otra forma de usar Fragments para no cargar divs innecesarios al DOM: <> ... </>
  // Esto se requiere porque es necesario encapsular todo componente; que represente
  // un solo elemento padre (aunque en el Navegador los elementos hijos seasn independientes)
  <>
    <section className="notFound">
      <div className="container">
        <div className="row align-items-center justify-content-start py-3 m-0">
          <div className="col-12 p-0 m-0">
            <a href="/" className="backToHome">
              <h4>❮ Ir al inicio</h4>
            </a>
          </div>
          <div className="col-12 text-center mt-5 p-0">
            <h1>
              <strong>Hmmm!</strong>
            </h1>
            <figure>
              <img src={cannotFound404} alt="Not Found" className="img-fluid" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default NotFound;
