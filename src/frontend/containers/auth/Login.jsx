/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { loginRequest } from '../actions';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import '../../assets/styles/components/Login.scss';
import googleIcon from '../../assets/static/google-icon.png';

const Login = () => {
  // const Login = (props) => {
  // const [form, setValues] = useState({
  //   email: '',
  // });

  // const handleInput = (event) => {
  //   setValues({
  //     ...form,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   props.loginRequest(form);
  //   props.history.push('/');
  // };

  return (
    <>
      {/* <Header isLogin /> */}
      <section className="login">
        <section className="login__container">
          <div className="login__container--title text-center mb-2">
            <h2>Inicia sesión</h2>
          </div>
          <form
            className="login__container--form"
            // method="POST"
            // action="#"
            // onSubmit={handleSubmit}
          >
            <div className="form-group mb-3 wrap-input">
              <input
                name="email"
                className="login__container--form--textInput"
                type="text"
                placeholder="Correo o usuario"
                autoComplete="off"
                // onChange={handleInput}
              />
              <span className="focus-input" />
            </div>
            <div className="form-group mb-3 wrap-input">
              <input
                name="password"
                className="login__container--form--textInput"
                type="password"
                placeholder="Contraseña"
                autoComplete="off"
                required
                // onChange={handleInput}
              />
              <span className="focus-input" />
            </div>
            <button className="btn btn-light" type="submit">
              Iniciar sesión
            </button>
            <div className="login__container--remember-me">
              <div className="login__container--remember-me--switch custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch1"
                  disabled
                />
                <label className="custom-control-label" htmlFor="customSwitch1">
                  Recuérdame
                </label>
              </div>
              <a href="/">Olvidé mi contraseña</a>
            </div>
          </form>
          <section className="login__container--social-media">
            <div className="mt-4 mb-4 justify-content-center">
              <img src={googleIcon} alt="Google Icon" />
              Inicia sesión con Google
            </div>
          </section>
          <section className="login__container--register">
            ¿No tienes tu cuenta?
            <Link to="/registrar">Regístrate aquí</Link>
          </section>
        </section>
      </section>
    </>
  );
};

// const mapDispatchToProps = {
//   loginRequest,
// };

// export default connect(null, mapDispatchToProps)(Login);

export default Login;
