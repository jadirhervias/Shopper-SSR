/* eslint-disable no-unused-vars */
import React from 'react';
// import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../assets/styles/components/ShoppingCar.scss';

const ShoppingCar = (props) => {
  return (
    <div className="shoppingCar container-fluid">
      <div className="row align-items-center">
        <div className="col-md-4">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>PLAZA VEA</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              N° de productos
              <span className="badge badge-warning badge-pill">45</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Total
              <span className="badge badge-warning badge-pill">S/. 150</span>
            </li>
          </ul>
        </div>
        <div className="col-md-8 text-right" id="shopping-car-buttons">
          <Button variant="success" size="md" className="m-2">
            Ir al carrito
          </Button>
          <Button variant="danger" size="md" className="m-2">
            Realizar compra
          </Button>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className='d-flex p-2 bd-highlight justify-content-between'>
        <div className='d-flex flex-row-reverse bd-highlight mb-3'>
          <div className='p-2 bd-highligh'>
            <Button variant='success' size='lg'>
              Large button
            </Button>
          </div>
          <div className='p-2 bd-highlight'>
            <Button variant='danger' size='lg'>
              Large button
            </Button>
          </div>
        </div>
      </div> */
}

// Solo traigo los datos que necesito del state
// const mapStateToProps = (state) => {
//   return {
//   };
// };

export default ShoppingCar;
// export default connect(null, null)(ShoppingCar);
