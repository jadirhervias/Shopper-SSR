/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, Col, Row } from 'react-bootstrap';
// import { RiCopyrightLine } from 'react-icons/ri';
import {
  FaTwitterSquare,
  FaInstagramSquare,
  FaFacebookSquare,
} from 'react-icons/fa';
import mobileStores from '../../assets/static/playstore-appstore.png';
import logo from '../../assets/static/shopper-logo.png';
import '../../assets/styles/components/Footer.scss';

const Footer = () => (
  <footer className="footer">
    <Container fluid className="footer__container">
      <Row className="footer__container--content align-items-center pt-5">
        <Col
          sm={4}
          lg={3}
          className="footer__container--col pl-5 pr-2 pt-5"
          id="footer__container--left"
        >
          <ul>
            <li className="footer__container--list-tittle">
              <strong>Sobre nosotros</strong>
            </li>
            <li>
              <Link to="/">Trabaja con nosotros</Link>
            </li>
            <li>
              <Link to="/">Shoppers</Link>
            </li>
          </ul>
        </Col>
        <Col
          sm={4}
          lg={3}
          className="footer__container--col px-2 pt-5"
          id="footer__container--middle"
        >
          <ul>
            <li className="footer__container--list-tittle">
              <strong>Ayuda</strong>
            </li>
            <li>
              <Link to="/">Contacto</Link>
            </li>
            <li>
              <Link to="/">Preguntas frecuentes</Link>
            </li>
            <li>
              <Link to="/">Libro de reclamaciones</Link>
            </li>
          </ul>
        </Col>
        <Col
          sm={3}
          lg={3}
          className="footer__container--col text-center px-2 pt-5 ml-auto"
          id="footer__container--right"
        >
          <Image src={logo} className="logo-shopper" />
          <ul>
            <li className="footer__container--list-tittle">
              <strong>Síguenos en</strong>
            </li>
            <li>
              <Link to="/">
                <FaFacebookSquare
                  size={32}
                  className="social-network-icon m-1"
                />
              </Link>
              <Link to="/">
                <FaInstagramSquare
                  size={32}
                  className="social-network-icon m-1"
                />
              </Link>
              <Link to="/">
                <FaTwitterSquare
                  size={32}
                  className="social-network-icon m-1"
                />
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="copyRighRow align-items-center text-center mx-4">
        <Col md={12} className="py-3">
          {/* <RiCopyrightLine /> */}
          2020 ©Shopper
        </Col>
      </Row>
    </Container>
    {/* <a href="/">Terminos de uso</a>
    <a href="/">Declaración de privacidad</a>
    <a href="/">Centro de ayuda</a> */}
  </footer>
);

export default Footer;
