import React from 'react';
import '../../assets/styles/components/Categories.scss';

const Categories = ({ children, title }) => {
  return (
    <section className="categories">
      <h3 className="categories__title">{title}</h3>
      {/* Componentes hijos pasados por medio de los props */}
      {children}
    </section>
  );
};

export default Categories;
