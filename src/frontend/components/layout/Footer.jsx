/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTwitterSquare,
  FaInstagramSquare,
  FaFacebookSquare,
} from 'react-icons/fa';
import logo from '../../assets/static/shopper-logo.png';
import '../../assets/styles/components/Footer.scss';

const Footer = () => (
  <footer className="pt-4 pb-2 letras-footer bg-footer">
    <div className="container px-0">
      <div className="row justify-content-center m-0">
        <div className="col-xl-4 col-sm-6 text-center pt-4 px-0">
          <h6 className="footer__container--list-tittle">
            <strong>Sobre nosotros</strong>
          </h6>
          <h6>
            <Link to="/">Trabaja con nosotros</Link>
          </h6>
          <h6>
            <Link to="/">Shoppers</Link>
          </h6>
        </div>
        <div className="col-xl-4 col-sm-6 text-center pt-4 px-0">
          <h6 className="footer__container--list-tittle">
            <strong>Ayuda</strong>
          </h6>
          <h6>
            <Link to="/">Contacto</Link>
          </h6>
          <h6>
            <Link to="/">Preguntas frecuentes</Link>
          </h6>
          <h6>
            <Link to="/">Libro de reclamaciones</Link>
          </h6>
        </div>
        <div className="col-xl-4 col-sm-12 text-center pt-4 px-0">
          <div className="row justify-content-center m-0">
            <img src={logo} width="150px" alt="Shopper" />
          </div>
          <strong className="footer__container--list-tittle">
            Síguenos en
          </strong>
          <div className="row justify-content-center m-0">
            <Link to="/">
              <FaFacebookSquare size={32} className="social-network-icon m-1" />
            </Link>
            <Link to="/">
              <FaInstagramSquare
                size={32}
                className="social-network-icon m-1"
              />
            </Link>
            <Link to="/">
              <FaTwitterSquare size={32} className="social-network-icon m-1" />
            </Link>
          </div>
        </div>

        {/* <div className="col-1 d-none d-xl-block " /> */}
      </div>
      <div className="row justify-content-center text-center m-0">
        <div className="col-md-12 px-0">2020 ©Shopper</div>
      </div>
    </div>
  </footer>
);

export default Footer;
