import React from 'react';

const NotFound = () => (
  // Otra forma de usar Fragments para no cargar divs innecesarios al DOM: <> ... </>
  // Esto se requiere porque es necesario encapsular todo componente; que represente
  // un solo elemento padre (aunque en el Navegador los elementos hijos seasn independientes)
  <>
    <h1>No Encontrado</h1>
    <h2>Regresa al Home</h2>
  </>
);

export default NotFound;
