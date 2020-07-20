/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from '../../firebase/firebaseInit';
import { trimInput, textValidator } from '../../utils/inputValidators';
import { saveUserShoppingCar } from '../../actions/userActions';
import { isRunningOnClientSide } from '../../utils/windowReference';
import '../../assets/styles/components/SaveShoppingCarModal.scss';

const SaveShopingCarModal = () => {
  const dispatch = useDispatch();

  let storageRef;

  if (isRunningOnClientSide === true && FirebaseContext !== null) {
    console.log('client side');
    const firebaseContext = useContext(FirebaseContext);
    storageRef = firebaseContext.storageRef;
  }

  const shop = useSelector((state) => state.currentShop);
  const user = useSelector((state) => state.user);
  const shoppingCar = useSelector((state) => state.shoppingCar);

  const commissionCost = 5;

  const [checked, setChecked] = useState(false);
  const [saveShoppingCarForm, setShoppingCarForm] = useState({
    products: shoppingCar.products,
    name: null,
    total_cost: shoppingCar.totalCost + commissionCost,
    shop_id: shop.id,
    count: shoppingCar.count,
  });

  const handleInput = (event) => {
    setShoppingCarForm({
      ...saveShoppingCarForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    delete saveShoppingCarForm.count;
    delete saveShoppingCarForm.total_cost;
    if (!checked) {
      delete saveShoppingCarForm.name;
      dispatch(saveUserShoppingCar(saveShoppingCarForm, user.id));
    } else {
      const carName = trimInput(saveShoppingCarForm.name);
      if (textValidator(carName)) {
        dispatch(
          saveUserShoppingCar(
            { ...saveShoppingCarForm, name: carName },
            user.id
          )
        );
      } else {
        console.log('VERIFIQUE EMAIL INGRESADO');
      }
    }
  };

  useEffect(() => {
    if (isRunningOnClientSide === true && storageRef !== null) {
      storageRef
        .child(`shops/${shop.image}`)
        .getDownloadURL()
        .then((url) => {
          document.getElementById(`currentShop__image-${shop.id}`).src = url;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div
      className="modal fade"
      id="modalSaveShoppingCar"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row justify-content-end">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-center my-2">
                <h3>Guardar tu carrito para futuras compras</h3>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-center align-items-center p-4">
                <form action="POST" onSubmit={handleSubmit}>
                  <div className="d-flex flex-row bd-highlight justify-content-start mt-2 mb-1">
                    <div className="bd-highlight p-2">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            checked={checked}
                            name="giveName"
                            type="checkbox"
                            id="giveNameCheck"
                            onChange={() => setChecked(!checked)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="giveNameCheck"
                          >
                            Darle un nombre al carrito
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {checked && (
                    <div className="d-flex flex-row bd-highlight justify-content-start">
                      <div className="bd-highlight p-2">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Nombre para el carrito"
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  )}
                  <div className="d-flex flex-row bd-highlight justify-content-around my-2">
                    <div className="bd-highlight p-2">
                      <img
                        id={`currentShop__image-${shop.id}`}
                        className="shoppingCarShop__img"
                        alt={shop.name}
                      />
                    </div>
                    <div className="bd-highlight p-2 align-self-center">
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Productos de cat&aacute;logo:
                          <span className="badge badge-info">
                            {shoppingCar.count}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Productos agregados manualmente:
                          <span className="badge badge-info">1</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Costo total:
                          <span className="badge badge-info">
                            {`S/. ${shoppingCar.totalCost + commissionCost}${
                              shoppingCar.totalCost % 1 === 0 ? '.00' : ''
                            }`}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex flex-row bd-highlight justify-content-around mt-3 mb-2">
                    <div className="bd-highlight p-2">
                      <input
                        type="submit"
                        className="btn btn-lg btn-secondary"
                        data-dismiss="modal"
                        value="Cancelar"
                      />
                    </div>
                    <div className="bd-highlight p-2">
                      <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Guardar"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveShopingCarModal;
