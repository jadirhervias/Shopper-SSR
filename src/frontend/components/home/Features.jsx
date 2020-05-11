import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../../assets/styles/components/Features.scss';

const Features = () => (
  <section className="features">
    <div className="col-md-6">
      <ListGroup>
        <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      </ListGroup>
    </div>
  </section>
);

export default Features;

{
  /* <div className="row-features row mr-0 p-4">
      <div className="col-md-6">
        <a
          href="/"
          className="btn btn-dark btn-lg"
          role="button"
          aria-pressed="false"
        >
          Block level button
        </a>
        <a
          href="/"
          className="btn btn-dark btn-lg"
          role="button"
          aria-pressed="true"
        >
          Block level button
        </a>
      </div>
      <div className="col-md-6">
        <a
          href="/"
          className="btn btn-dark btn-lg"
          role="button"
          aria-pressed="true"
        >
          Block level button
        </a>

        <a
          href="/"
          className="btn btn-dark btn-lg"
          role="button"
          aria-pressed="true"
        >
          Block level button
        </a>
      </div>
    </div> */
}
