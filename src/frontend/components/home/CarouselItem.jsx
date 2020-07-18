/* eslint-disable camelcase */
/* eslint-disable prefer-const */
import React, { useEffect, useContext } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setFavoriteShop, removeFavoriteShop } from '../../actions';
import { showShop } from '../../actions/shoppingActions';
import { FirebaseContext } from '../../firebase/firebaseInit';
import enterIcon from '../../assets/static/enter-icon.png';
import favoriteIcon from '../../assets/static/favorite-icon.png';
import removeIcon from '../../assets/static/remove-icon.png';
import '../../assets/styles/components/CarouselItem.scss';

const CarouselItem = (props) => {
  let { id, name, image, categories, last_update, isFav, parent } = props;

  const dispatch = useDispatch();

  const myList = useSelector((state) => state.myList);

  let context;

  if (useContext(FirebaseContext) !== null) {
    context = useContext(FirebaseContext);
  }

  useEffect(() => {
    if (context.storageRef !== null || context.storageRef !== undefined) {
      context.storageRef
        .child(`shops/${image}`)
        .getDownloadURL()
        .then((url) => {
          const elements = document.getElementsByClassName(
            `carousel-item__img image-${id}`
          );
          for (let i = 0; i < elements.length; i++) {
            elements[i].src = url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [myList]);

  // Función Handle para guardar el nuevo estado
  const handleSetFavoriteShop = () => {
    isFav = true;
    parent = 'myList';

    // Payload: objeto de propiedades para el componente
    props.setFavoriteShop({
      id,
      name,
      categories,
      last_update,
    });
  };

  const handleRemoveFavoriteShop = (id) => {
    isFav = false;
    parent = 'shops';

    props.removeFavoriteShop(id);
  };

  return (
    <div className="carousel-item">
      <img
        className={`carousel-item__img image-${id}`}
        alt={name}
        // loading='lazy'
      />
      <div className="carousel-item__details">
        <div>
          <Link to="/productos" onClick={() => dispatch(showShop(id))}>
            <img
              className="carousel-item__details--img"
              src={enterIcon}
              alt="Enter Icon"
            />
          </Link>
          {isFav && parent === 'myList' ? (
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="Remove Icon"
              onClick={() => handleRemoveFavoriteShop(id)}
            />
          ) : !isFav ? (
            <img
              className="carousel-item__details--img"
              src={favoriteIcon}
              alt="Favorite Icon"
              onClick={handleSetFavoriteShop}
            />
          ) : (
            isFav &&
            parent === 'shops' && (
              <img
                className="carousel-item__details--img"
                // src={plusIconDark}
                alt="Favorite Icon Disable"
                onClick={handleSetFavoriteShop}
              />
            )
          )}
        </div>
        <p className="carousel-item__details--title">{name}</p>
        {/* <p className="carousel-item__details--subtitle">
          N° Categorias:
          {categories.length}
        </p> */}
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
  setFavoriteShop,
  removeFavoriteShop,
};

export default connect(null, mapDispatchToProps)(CarouselItem);
