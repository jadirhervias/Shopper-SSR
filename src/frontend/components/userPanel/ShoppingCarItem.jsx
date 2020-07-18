import React from 'react';

const ShoppingCarItem = (shoppingCar) => {
  return (
    <div className="card shadow-sm mb-3 p-3">
      <div className="row no-gutters">
        <div className="col-5">
          {shoppingCar.name ? shoppingCar.name : 'No hay descripcion'}
        </div>
        <div className="col-3">{`S./ ${shoppingCar.total_cost}`}</div>
        <div className="col-4">
          <button type="button" className="btn btn-danger">
            Hacer pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCarItem;
