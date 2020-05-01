import { useState, useEffect } from 'react';

const useInitialState = (api) => {
  // [variable para guardar estado, función para actualizar el estado] = useState(valor para inicializar estado)
  const [productos, setProductos] = useState([]);

  // useEffect(función efecto, listener de props que cambien) // Si no hay listener -> bucle infinito
  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setProductos(data));
  }, []);

  return productos;
};

export default useInitialState;
