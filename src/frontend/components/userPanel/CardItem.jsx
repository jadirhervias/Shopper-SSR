import React from 'react';

const CardItem = (card) => {
  return (
    <div className="card shadow-sm mb-3 p-3">
      <div className="row no-gutters">
        <div className="col-5">Tarjeta de crédito</div>
        <div className="col-5">{card.card_number}</div>
        <div className="col-1">Visa</div>
        <div className="col-1">
          <input type="radio" disabled />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
