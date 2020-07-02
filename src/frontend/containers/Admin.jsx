import React from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import Footer from '../components/layout/Footer';
import '../assets/styles/components/Admin.scss';
// import Dashboard from '../components/admin/DashBoard';

const Admin = () => {
  return (
    <>
      <AdminHeader />

      <div className="container-fluid p-0">
        <div className="col-lg-3 m-0">
          <AdminSidebar />
        </div>

        <div className="col-lg-9 m-0">
          <main>
            <div className="container">
              <div className="row my-4">
                MAIN PAGE
                {/* <Dashboard /> */}
                {/* {showUserOrders ? (
                <OrdersHistory />
              ) : showUserShoppingCars ? (
                <UserShoppingCars />
              ) : showUserCards ? (
                <UserCards />
              ) : (
                <UserAccountData />
              )} */}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Admin;
