// import { useState, useEffect } from 'react';

// const useInitialState = (apis) => {
//   // [variable para guardar estado, función para actualizar el estado] = useState(valor para inicializar estado)
//   const [shops, setShops] = useState([]);

//   const [myList, setMyList] = useState([]);

//   // useEffect(función efecto, listener de props que cambien) // Si no hay listener -> bucle infinito
//   useEffect(() => {
//     fetch(apis[0])
//       .then((response) => response.json())
//       .then((data) => setShops(data));
//   }, []);

//   useEffect(() => {
//     fetch(apis[1])
//       .then((response) => response.json())
//       .then((data) => setMyList(data));
//   }, []);

//   const response = {
//     shops,
//     myList,
//   };

//   return response;
// };

// export default useInitialState;
