/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/authActions';
import { addRegistrationDeviceId } from '../actions/notificationActions';
import googleIconColors from '../assets/static/google-icon-colors.png';
import '../assets/styles/components/Login.scss';

const Login = (props) => {
  const [form, setValues] = useState({
    email: '',
  });

  const user = useSelector((state) => state.user);

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    // para evitar recargas de página, cambios en la URL, comportamientos típicos de html
    event.preventDefault();
    console.log(`registrarion ID: ${user.registrationDeviceId}`);
    props.loginUser(form, '/', user.registrationDeviceId);

    // Hooks warning!
    // const user = useSelector(state => state.user);
    // props.addRegistrationDeviceId(user.registrationDeviceId, user.id);
  };

  return (
    <>
      {/* <Header isLogin /> */}
      <section className="login">
        <div className="login__container">
          <div className="row login__container--title justify-content-center mb-2">
            <h2>Inicia sesión</h2>
          </div>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <div className="form-group mb-3 login--wrap-input">
              <input
                name="email"
                className="login__container--form--textInput text-center px-4"
                type="text"
                placeholder="Correo o usuario"
                autoComplete="off"
                // para capturar los cambios en tiempo real
                onChange={handleInput}
              />
              <span className="login--focus-input" />
            </div>
            <div className="form-group mb-3 login--wrap-input">
              <input
                name="password"
                className="login__container--form--textInput text-center px-4"
                type="password"
                placeholder="Contraseña"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <span className="login--focus-input" />
            </div>
            <button className="btn btn-light" type="submit">
              Iniciar sesión
            </button>
            <div className="login__container--remember-me">
              <div className="login__container--remember-me--switch custom-control custom-switch">
                {/* <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch1"
                  // disabled
                /> */}
                <label className="custom-control-label" htmlFor="customSwitch1">
                  Recuérdame
                </label>
              </div>
              <a href="/productos">Olvidé mi contraseña</a>
            </div>
          </form>
          <section className="login__container--social-media">
            <div className="mt-4 mb-4 justify-content-center">
              <img src={googleIconColors} alt="Google Icon" />
              Inicia sesión con Google
            </div>
          </section>
          <section className="login__container--register">
            ¿No tienes tu cuenta?
            <Link to="/registrar">Regístrate aquí</Link>
          </section>
        </div>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginUser,
  addRegistrationDeviceId,
};

Login.propTypes = {
  loginUser: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Login);
