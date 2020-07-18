/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/styles/components/SearchMapModal.scss';
import { isRunningOnServerSide } from '../../utils/windowReference';

const SearchMapModal = () => {
  const user = useSelector((state) => state.user);
  // const shop = useSelector((state) => state.currentShop);

  const handleLocationError = (
    browserHasGeolocation,
    infoWindow,
    userCoordenates,
    map
  ) => {
    infoWindow.setPosition(userCoordenates);
    infoWindow.setContent(
      browserHasGeolocation ?
        'Error: El servicio de geolocalizacion falló' :
        'Error: Tu navegador no soporta geolocalización.'
    );
    infoWindow.open(map);
  };

  // Map to use in order process
  const initSearchMapModal = () => {
    const map2 = new google.maps.Map(
      document.getElementById('searchShopsMap'),
      {
        center: {
          lat: Number(user.lat),
          lng: Number(user.lng),
        },
        zoom: 14,
        streetViewControl: false,
        mapTypeControl: false,
      }
    );

    const infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const userCoordenates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(userCoordenates);
          infoWindow.setContent('Se encontró tu ubicación');
          infoWindow.open(map2);
          map2.setCenter(userCoordenates);
        },
        function () {
          handleLocationError(true, infoWindow, map2.getCenter(), map2);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map2.getCenter(), map2);
    }

    // Attach the map to the `window` object
    window.map2 = map2;

    // The marker, positioned at the shop
    // const currentShopmarker = new google.maps.Marker({
    //   position: {
    //     lat: shop.shop_lat,
    //     lng: shop.shop_lng,
    //   },
    //   map,
    // });

    // The marker, positioned at the user default location from the database
    const userDefaultMarker = new google.maps.Marker({
      position: {
        lat: Number(user.lat),
        lng: Number(user.lng),
      },
      map2,
    });
  };

  useEffect(() => {
    if (isRunningOnServerSide) {
      initSearchMapModal();

      // TODO: use app state to load map or not
      // window.addEventListener('load', () => {
      //   if (props.googleMapsLoaded) {
      //     initMap();
      //   }
      // })
    }
  }, []);

  return (
    <div
      className="modal fade"
      id="modalGoogleMapsSearch"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row justify-content-end">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-center my-2">
                <h3>Ubica tus tiendas preferidas cerca de ti</h3>
              </div>
              <form
                action="POST"
                // onSubmit={handleSubmit}
              >
                <div className="d-flex flex-row bd-highlight justify-content-center my-2">
                  <div className="bd-highlight p-2">
                    <div className="form-group">
                      <div className="bd-highlight p-2">
                        <input
                          type="text"
                          name="name"
                          className="form-control text-center"
                          placeholder="Ingrese su direcci&oacute;n"
                          // onChange={handleInput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row bd-highlight justify-content-around my-2">
                  <div className="bd-highlight p-2" />
                  <div className="bd-highlight p-2 align-self-center" />
                </div>
              </form>
              <div className="d-flex flex-row bd-highlight justify-content-center my-2">
                <div id="searchShopsMap" />
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-around mt-3 mb-2">
                <div className="bd-highlight p-2">
                  <input
                    type="submit"
                    className="btn btn-lg btn-secondary"
                    data-dismiss="modal"
                    value="Cancelar"
                  />
                </div>
                <div className="bd-highlight p-2">
                  <input
                    type="submit"
                    className="btn btn-lg btn-danger btn-block"
                    value="Guardar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMapModal;
