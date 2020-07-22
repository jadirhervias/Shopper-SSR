import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderShoppingCar } from '../../actions/shoppingActions';

const ShoppingCarItem = (shoppingCar) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      selectOrderShoppingCar(user.id, shoppingCar.id, shoppingCar.shop_id)
    );
    history.push('/carrito');
  };

  return (
    <div className="card shadow-sm mb-3 p-3">
      <div className="row no-gutters">
        <div className="col-5">
          {shoppingCar.name ? shoppingCar.name : 'No hay descripcion'}
        </div>
        <div className="col-3">{`S./ ${shoppingCar.total_cost}`}</div>
        <div className="col-4">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClick}
          >
            Hacer pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCarItem;
