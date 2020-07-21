/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isRunningOnClientSide } from '../../utils/windowReference';
import AddressResults from './AddressResults';
import '../../assets/styles/components/LocationModal.scss';
import { setOrderCoordenatesAction } from '../../actions/orderAction';

const LocationModal = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.currentShop);
  const mapLoaded = useSelector((state) => state.mapLoaded);

  const [searchAddress, setSearchAddress] = useState('');
  const [locationModalMap, setLocationModalMap] = useState({});
  const [locationModalGeocoder, setLocationModalGeocoder] = useState({});
  const [infoWindow, setInfoWindow] = useState({});
  const [geocoderResults, setGeocoderResults] = useState([]);

  // Display results in the map
  function geocodeAddress(
    geocoder,
    resultsMap,
    addressToFind,
    addressOnFindClick
  ) {
    geocoder.geocode(
      {
        address: addressToFind,
      },
      function (results, status) {
        if (status === 'OK') {
          // resultsMap.setCenter(addressOnFindClick.geometry.location);
          console.log(results);
          // Results
          setGeocoderResults(results);
        } else {
          console.log(
            `Geocode no fue exitoso por el seguiente motivo: ${status}`
          );
        }
      }
    );
  }

  // TODO INICIO - COMBINAR AMBAS FUNCIONES

  // Hacerlo funcionar para la presentacion (handle on change event)
  // antes ERROR: consulta en cada evento handleChange sobrecarga a la API
  const handleChange = (e) => {
    setSearchAddress(e.target.value);
    console.log(e.target.value);
  };

  const handleFindLocation = (e, geocoder, map) => {
    e.preventDefault();
    console.log('ON CLICK FIND LOCATION');
    console.log(searchAddress);
    // TODO: update in production (billing issues)
    geocodeAddress(geocoder, map, searchAddress);
  };
  // TODO FIN

  const handleLocationError = (
    browserHasGeolocation,
    infoWindow,
    userCoordenates
  ) => {
    infoWindow.setPosition(userCoordenates);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: El servicio de geolocalizacion falló'
        : 'Error: Tu navegador no soporta geolocalización.'
    );
    infoWindow.open(map);
  };

  const handleClick = (e, address, map) => {
    e.preventDefault();
    // insert the value for the autocomplete text field
    setSearchAddress(address.formatted_address);
    // Target address
    dispatch(
      setOrderCoordenatesAction(
        JSON.parse(JSON.stringify(address.geometry.location))
      )
    );

    locationModalMap.setCenter(address.geometry.location);

    const chosenLocationMarker = new google.maps.Marker({
      map,
      position: address.geometry.location,
    });

    // Clean options
    setGeocoderResults([]);
  };

  // HTML5 geolocation.
  const useBrowserGeolocation = (map, infoWindow) => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const userCoordenates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(userCoordenates);
          infoWindow.setContent('Usted se encuentra aquí');
          infoWindow.open(map);
          map.setCenter(userCoordenates);
        },
        function () {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      // Use default user location
      map.setCenter({
        lat: Number(user.lat),
        lng: Number(user.lng),
      });
      handleLocationError(false, infoWindow, map.getCenter());
    }
  };

  const handleCancel = (e, map, infoOfWindow) => {
    e.preventDefault();
    // Remove chosen location
    useBrowserGeolocation(map, infoOfWindow);
    setSearchAddress('');
    dispatch(
      setOrderCoordenatesAction({
        lat: Number(user.lat),
        lng: Number(user.lng),
      })
    );
  };

  // Map to use in order process
  const initLocationModalMap = () =>
    // map, infoWindowObj, geocoder, currentShopmarker
    {
      const map = new google.maps.Map(document.getElementById('payOrderMap'), {
        zoom: 9,
        streetViewControl: false,
        mapTypeControl: false,
      });
      setLocationModalMap(map);

      const infoWindowObj = new google.maps.InfoWindow();
      setInfoWindow(infoWindowObj);

      // Try HTML5 geolocation.
      useBrowserGeolocation(map, infoWindowObj);

      const geocoder = new google.maps.Geocoder();
      setLocationModalGeocoder(geocoder);

      // Attach the map to the `window` object
      window.map = map;

      // The marker, positioned at the shop
      const currentShopmarker = new google.maps.Marker({
        position: {
          lat: Number(shop.shop_lat),
          lng: Number(shop.shop_lng),
        },
        map,
      });
    };

  useEffect(() => {
    if (isRunningOnClientSide || mapLoaded) {
      // const map = new google.maps.Map(document.getElementById('payOrderMap'), {
      //   zoom: 9,
      //   streetViewControl: false,
      //   mapTypeControl: false,
      // });

      // const infoWindowObj = new google.maps.InfoWindow();

      // const geocoder = new google.maps.Geocoder();

      // window.map = map;

      // const currentShopmarker = new google.maps.Marker({
      //   position: {
      //     lat: Number(shop.shop_lat),
      //     lng: Number(shop.shop_lng),
      //   },
      //   map,
      // });

      // initLocationModalMap(map, infoWindowObj, geocoder, currentShopmarker);
      initLocationModalMap();

      // TODO: use app state to load map or not
      // window.addEventListener('load', () => {
      //   if (props.googleMapsLoaded) {
      //     initMap();
      //   }
      // })
    }

    return () => {
      console.log('location modal unmounted!');
      setSearchAddress('');
    };
  }, []);

  return (
    <div
      className="modal fade"
      id="modalGoogleMaps"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
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
              <div className="d-flex flex-row bd-highlight justify-content-center align-items-center">
                <h3>¿D&oacute;nde te ubicamos?</h3>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-center align-items-center">
                <div className="bd-highlight p-2">
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control mb-2 mr-sm-2 text-center"
                    id="addressSelect"
                    placeholder="Ingrese una direcci&oacute;n"
                    onChange={handleChange}
                    value={searchAddress}
                    // onChange={(e) => handleChange(e, locationModalGeocoder, locationModalMap)}
                  />
                </div>
                <div className="bd-highlight p-2">
                  <input
                    type="submit"
                    className="btn btn-lg btn-info"
                    onClick={(e) =>
                      handleFindLocation(
                        e,
                        locationModalGeocoder,
                        locationModalMap
                      )
                    }
                  />
                </div>
              </div>

              <AddressResults
                geocoderResults={geocoderResults}
                handleClick={handleClick}
                locationModalMap={window.map}
                searchAddress={searchAddress}
              />

              <div className="d-flex flex-row bd-highlight justify-content-center align-items-center p-4">
                <div id="payOrderMap" />
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-around mt-3 mb-2">
                <div className="bd-highlight p-2">
                  <input
                    type="submit"
                    className="btn btn-lg btn-secondary"
                    data-dismiss="modal"
                    value="Cancelar"
                    onClick={(e) =>
                      handleCancel(e, locationModalMap, infoWindow)
                    }
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

export default LocationModal;
