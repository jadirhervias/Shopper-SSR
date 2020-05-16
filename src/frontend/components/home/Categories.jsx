import React from 'react';
import '../../assets/styles/components/Categories.scss';

const Categories = ({ children, title }) => {
  return (
    <div className="categories">
      {/* text-center */}
      <h1 className="categories__title">{title}</h1>
      {/* Componentes hijos pasados por medio de los props */}
      {children}
    </div>
  );
};

export default Categories;
