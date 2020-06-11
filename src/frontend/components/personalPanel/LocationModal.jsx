/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/styles/components/LocationModal.scss';

const LocationModal = () => {
  const shoppingCar = useSelector((state) => state.shoppingCar);

  const shopLat = -11.9331205;
  const shopLong = -77.045615;

  const shopLocation = {
    lat: shopLat,
    lng: shopLong,
  };

  let map, infoWindow;

  function handleLocationError(
    browserHasGeolocation,
    infoWindow,
    userCoordenates
  ) {
    infoWindow.setPosition(userCoordenates);
    infoWindow.setContent(
      browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  useEffect(() => {
    // Attach your callback function to the `window` object
    window.initMap = function () {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: -34.397,
          lng: 150.644,
        },
        zoom: 14,
      });

      infoWindow = new google.maps.InfoWindow();

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const userCoordenates = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(userCoordenates);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(userCoordenates);
          },
          function () {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      // The marker, positioned at the shop
      const marker = new google.maps.Marker({
        position: shopLocation,
        map,
      });
    };

    // Create the script tag, set the appropriate attributes
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZSh7VHgy9ocUR0j06RE2do0vO74Gw-0E&callback=initMap';
    script.id = 'googleMaps';
    script.defer = true;
    script.async = true;

    // Append the 'script' element to 'head'
    document.head.appendChild(script);
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
              <div className="row justify-content-center align-items-center">
                <h3>¿Dónde te ubicamos?</h3>
              </div>
              <div className="row justify-content-center align-items-center p-4">
                <div id="map" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
