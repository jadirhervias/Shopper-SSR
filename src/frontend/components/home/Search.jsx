/* eslint-disable no-unused-vars */
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Jumbotron,
  Container,
  InputGroup,
  FormControl,
  Button,
  Image,
  Col,
  Row,
} from 'react-bootstrap';
import { searchRequest } from '../../actions';
import left from '../../assets/static/search-izq.png';
import right from '../../assets/static/search-der.png';
import '../../assets/styles/components/Search.scss';

const Search = (props) => {
  const [searchInput, doSearch] = useState({
    searching: '',
  });

  const handleInput = (event) => {
    event.preventDefault();

    doSearch({
      ...searchInput,
      [event.target.name]: event.target.value.trim(),
    });
  };

  // eslint-disable-next-line react/destructuring-assignment
  props.searchRequest(searchInput);

  return (
    <section className="main">
      {/* ¿Dónde quieres comprar hoy? */}
      <Jumbotron fluid className="main__container">
        {/* <Container fluid> */}
        <Row className="align-items-center">
          <Col md={2}>
            <Image src={left} className="search-decoration-image" fluid />
          </Col>
          <Col md={8} className="text-center main__container--middle-content">
            <Row className="main__container--title justify-content-center mb-1 px-5">
              <h1>Quédate en casa, nosotros nos encargamos</h1>
            </Row>
            <Row className="justify-content-center mb-5 px-5">
              <h4 className="main__container--subtitle">
                Obtén tus compras del supermercado o mercado favorito en menos
                de una hora
              </h4>
            </Row>
            <Row className="main__container--search-form px-5">
              <InputGroup>
                <FormControl
                  name="searching"
                  type="text"
                  placeholder="Ingrese su locación"
                  aria-label="Ingrese su locación"
                  aria-describedby="basic-addon2"
                  className="main__container--input-search"
                  autoComplete="off"
                  onChange={handleInput}
                />
                <InputGroup.Append>
                  <Button size="lg" variant="info">
                    Buscar
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Row>
          </Col>
          <Col md={2}>
            <Image src={right} className="search-decoration-image" fluid />
          </Col>
        </Row>
        {/* </Container> */}
      </Jumbotron>
    </section>
  );
};

const mapDispatchToProps = {
  searchRequest,
};

export default connect(null, mapDispatchToProps)(Search);
