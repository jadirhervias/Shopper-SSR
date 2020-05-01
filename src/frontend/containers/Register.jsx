/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
// import { registerRequest } from '../actions';
import '../assets/styles/components/Register.scss';
import Footer from '../components/layout/Footer';

const Register = () => {
  // const Register = (props) => {
  //   const [form, setValues] = useState({
  //     email: '',
  //     name: '',
  //     password: '',
  //   });

  //   const handleInput = (event) => {
  //     setValues({
  //       ...form,
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     props.registerRequest(form);
  //     props.history.push('/');
  //   };

  return (
    <>
      {/* <Header isRegister />
      <span className="focus-input" />
      <div className="form-group mb-3 wrap-input"> */}
      <section className="register">
        <section className="register__container mt-5 mb-5">
          <div className="register__container--title text-center mb-2">
            <h2>Regístrate</h2>
          </div>
          <form
            className="register__container--form"
            // onSubmit={handleSubmit}
          >
            <div className="form-group mb-3 wrap-input">
              <input
                name="firstName"
                className="register__container--form--input"
                type="text"
                placeholder="Nombre"
                autoComplete="off"
                required
                // onChange={handleInput}
              />
              <span className="focus-input" />
            </div>
            <div className="form-group mb-3 wrap-input">
              <input
                name="lastName"
                className="register__container--form--input"
                type="text"
                placeholder="Apellido"
                autoComplete="off"
                required
                // onChange={handleInput}
              />
              <span className="focus-input" />
            </div>
            <div className="form-group mb-3 wrap-input">
              <input
                name="email"
                className="register__container--form--input"
                type="text"
                placeholder="Correo"
                autoComplete="off"
                required
                // onChange={handleInput}
              />
              <span className="focus-input" />
            </div>
            <div className="form-group mb-3 wrap-input">
              <input
                name="phoneNumber"
                className="register__container--form--input"
                type="tel"
                placeholder="Número de celular"
                autoComplete="off"
                required
                // onChange={handleInput}
              />
              <span className="focus-input" />
            </div>
            <div className="form-group mb-3 wrap-input">
              <input
                name="address"
                className="register__container--form--input"
                type="text"
                placeholder="Dirección"
                autoComplete="off"
                required
                // onChange={handleInput}
              />
              <span className="focus-input" />
            </div>
            <div className="form-group mb-3 wrap-input">
              <input
                name="password"
                className="register__container--form--input"
                type="password"
                placeholder="Contraseña"
                autoComplete="off"
                required
                // onChange={handleInput}
              />
              <span className="focus-input" />
            </div>
            <button className="btn btn-light" type="submit">
              Registrarme
            </button>
          </form>
          <Link className="mt-1" to="/login">
            Ya tengo una cuenta
          </Link>
        </section>
      </section>
    </>
  );
};

// const mapDispatchToProps = {
//   registerRequest,
// };

// export default connect(null, mapDispatchToProps)(Register);

export default Register;