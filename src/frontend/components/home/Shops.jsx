import React from 'react';
import '../../assets/styles/components/Shops.scss';

const Shops = ({ children, title }) => {
  return (
    <div className="shops">
      {/* text-center */}
      <h1 className="shops__title">{title}</h1>
      {/* Componentes hijos pasados por medio de los props */}
      {children}
    </div>
  );
};

export default Shops;
