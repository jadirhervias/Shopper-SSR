import React from 'react';
import { useSelector } from 'react-redux';

const UserAccountData = () => {
  const userData = useSelector((state) => state.user);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm h-80 mb-3">
            <div className="row no-gutters">
              <div className="col-12">
                <div className="card-body">
                  <p className="card-title">{`Email: ${userData.email}`}</p>
                  <p className="card-title">{`Nombre de usuario: ${userData.firstName} ${userData.lastName}`}</p>
                  <p className="card-title">
                    Tel&eacute;fono:
                    {' '}
                    {userData.phoneNumber}
                  </p>
                  {/* <input type="tel" />
                  <p className="card-text">
                    <small className="text-muted">Cuenta b&aacute;sica</small>
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountData;
