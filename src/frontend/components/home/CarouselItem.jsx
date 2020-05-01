/* eslint-disable camelcase */
/* eslint-disable prefer-const */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFavoriteCatalog, removeFavoriteCatalog } from '../../actions';
import '../../assets/styles/components/CarouselItem.scss';
import playIcon from '../../assets/static/play-icon.png';
import plusIcon from '../../assets/static/plus-icon.png';
import plusIconDark from '../../assets/static/plus-icon-dark.png';
import removeIcon from '../../assets/static/remove-icon.png';

const CarouselItem = (props) => {
  let { id, name, categories, last_update, isFav, parent } = props;

  console.log('PROPS: ', props);

  // Función Handle para guardar el nuevo estado
  const handleSetFavoriteCatalog = () => {
    isFav = true;
    parent = 'myList';
    console.log(`ISFAV: ${isFav}`);
    console.log(`PARENT: ${parent}`);
    // Payload: objeto de propiedades para el componente
    props.setFavoriteCatalog({
      id,
      name,
      categories,
      last_update,
    });
  };

  const handleRemoveFavoriteCatalog = (id) => {
    isFav = false;
    parent = 'catalogs';
    console.log(`ISFAV: ${isFav}`);
    console.log(`PARENT: ${parent}`);
    props.removeFavoriteCatalog(id);
  };

  return (
    <div className="carousel-item">
      <img
        className="carousel-item__img"
        // src="http://placehold.it/200x250"
        alt={name}
      />
      <div className="carousel-item__detaisls">
        <div>
          <img
            className="carousel-item__details--img"
            src={playIcon}
            alt="Play Icon"
          />
          {isFav && parent === 'myList' ? (
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="Remove Icon"
              onClick={() => handleRemoveFavoriteCatalog(id)}
            />
          ) : !isFav ? (
            <img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Plus Icon"
              onClick={handleSetFavoriteCatalog}
            />
          ) : (
            isFav &&
            parent === 'catalogs' && (
              <img
                className="carousel-item__details--img"
                src={plusIconDark}
                alt="Plus Icon Disable"
                onClick={handleSetFavoriteCatalog}
              />
            )
          )}
        </div>
        <p className="carousel-item__details--title">{name}</p>
        <p className="carousel-item__details--subtitle">
          N° Categorias:
          {categories.length}
        </p>
        <p className="carousel-item__details--subtitle">{last_update}</p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  categories: PropTypes.array,
  last_update: PropTypes.string,
};

// Dispatch de acciones
const mapDispatchToProps = {
  setFavoriteCatalog,
  removeFavoriteCatalog,
};

// export default CarouselItem;
export default connect(null, mapDispatchToProps)(CarouselItem);
