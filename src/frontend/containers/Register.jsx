import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import '../assets/styles/components/Register.scss';

const Register = (props) => {
  // form: estado del componente
  // setValues: captura los valores pasados en los inputs
  const [form, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    password: '',
  });

  console.log(form);

  // Para capturar la info que se transmitirá al estado a partir del form
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Para mandar la información
  const handleSubmit = (event) => {
    event.preventDefault();
    props.registerUser(form, '/login');

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
            <div className="form-group mb-3 register--wrap-input">
              <input
                name="password"
                className="register__container--form--input text-center px-4"
                type="password"
                placeholder="Contraseña"
                autoComplete="off"
                required
                onChange={handleInput}
              />
              <span className="register--focus-input" />
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
