/* eslint-disable camelcase */
/* eslint-disable prefer-const */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFavoriteCatalog, removeFavoriteCatalog } from '../../actions';
import '../../assets/styles/components/CarouselItem.scss';
import enterIcon from '../../assets/static/enter-icon.png';
import favoriteIcon from '../../assets/static/favorite-icon.png';
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
        src="http://placehold.it/200x250"
        // src="http://dummyimage.com/800x600.png/99118E/ffffff"
        alt={name}
      />
      <div className="carousel-item__details">
        <div>
          <img
            className="carousel-item__details--img"
            src={enterIcon}
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
              src={favoriteIcon}
              alt="Favorite Icon"
              onClick={handleSetFavoriteCatalog}
            />
          ) : (
            isFav &&
            parent === 'catalogs' && (
              <img
                className="carousel-item__details--img"
                // src={plusIconDark}
                alt="Favorite Icon Disable"
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
