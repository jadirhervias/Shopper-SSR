import React from 'react';
import '../../assets/styles/components/Spinner.scss';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div
        className="spinner-border shopper-spinner text-secondary"
        role="status"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

export default Spinner;
