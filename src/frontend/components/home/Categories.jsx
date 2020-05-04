import React from 'react';
import '../../assets/styles/components/Categories.scss';

const Categories = ({ children, title }) => {
  return (
    <div className="categories">
      <h3 className="categories__title">{title}</h3>
      {/* Componentes hijos pasados por medio de los props */}
      {children}
    </div>
  );
};

export default Categories;
