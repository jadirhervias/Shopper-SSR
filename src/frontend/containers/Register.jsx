/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { emailValidator } from '../utils/inputValidators';
import '../assets/styles/components/Register.scss';

const Register = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [form, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    password: '',
    passwordConfirm: '',
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleShowAlert = (message) => {
    setAlertMessage(message);
  };

  // Para mandar la información
  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password === form.passwordConfirm) {
      if (emailValidator(form.email)) {
        setShowAlert(false);
        const formToSend = {
          ...form,
        };
        delete formToSend.passwordConfirm;
        props.registerUser(formToSend, '/login');
      } else {
        handleShowAlert('Ingrese un email válido');
        setShowAlert(true);
      }
    } else {
      handleShowAlert('Verifique que ambas contraseñas coincidan');
      setShowAlert(true);
    }
    // props.registerUser(form, '/');

    // YA NO ES NECEARIO, PORQUE LA REDIRECCIÓN SE HACE EN EL MISMO ACTION
    // history de react router (browser router)
    // mandar a '/' después del registro
    // props.history.push('/');
  };

  return (
    <>
      {/* <Header isRegister /> */}
      <section className="register">
        <section className="register__container mt-5 mb-5">
          <div className="register__container--title text-center mb-2">
            <h2>Regístrate</h2>
          </div>
          <form className="register__container--form" onSubmit={handleSubmit}>
            <div className="form-group mb-3 register--wrap-input">
              <input
                name="first_name"
                className="register__container--form--input text-center px-4"
                type="text"
                placeholder="Nombre"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <span className="register--focus-input" />
            </div>
            <div className="form-group mb-3 register--wrap-input">
              <input
                name="last_name"
                className="register__container--form--input text-center px-4"
                type="text"
                placeholder="Apellido"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <span className="register--focus-input" />
            </div>
            <div className="form-group mb-3 register--wrap-input">
              <input
                name="email"
                className="register__container--form--input text-center px-4"
                type="text"
                placeholder="Correo"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <span className="register--focus-input" />
            </div>
            <div className="form-group mb-3 register--wrap-input">
              <input
                name="phone_number"
                className="register__container--form--input text-center px-4"
                type="tel"
                placeholder="Número de celular"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <span className="register--focus-input" />
            </div>
            <div className="form-group mb-3 register--wrap-input">
              <input
                name="address"
                className="register__container--form--input text-center px-4"
                type="text"
                placeholder="Dirección"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <span className="register--focus-input" />
            </div>
            <div className="form-group register--wrap-input">
              <input
                name="password"
                className="register__container--form--input text-center px-4"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <span className="register--focus-input" />
            </div>
            <div className="d-flex align-items-end flex-column bd-highlight">
              <a
                className="badge badge-pill badge-light show-hide-password mb-3"
                onClick={handleShowPassword}
              >
                <small>{showPassword ? 'OCULTAR' : 'MOSTRAR'}</small>
              </a>
            </div>
            <div className="form-group register--wrap-input">
              <input
                name="passwordConfirm"
                className="register__container--form--input text-center px-4"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar Contraseña"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <span className="register--focus-input" />
            </div>
            <div className="d-flex align-items-end flex-column bd-highlight">
              <a
                className="badge badge-pill badge-light show-hide-password mb-3"
                onClick={handleShowConfirmPassword}
              >
                <small>{showConfirmPassword ? 'OCULTAR' : 'MOSTRAR'}</small>
              </a>
            </div>
            <div className="d-flex align-items-center flex-column bd-highlight">
              {showAlert && (
                <div className="alert alert-warning" role="alert">
                  {alertMessage}
                </div>
              )}
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

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(Register);
