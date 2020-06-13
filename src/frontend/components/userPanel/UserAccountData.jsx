import React from 'react';
import { useSelector } from 'react-redux';

const UserAccountData = () => {
  const userData = useSelector((state) => state.user);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">{`Email: ${userData.email}`}</div>
      </div>
    </div>
  );
};

export default UserAccountData;
