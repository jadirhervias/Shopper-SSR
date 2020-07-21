import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';
import axios from 'axios';
import googleApiKey from '../../credentials/googleApiKey';
import { FirebaseContext } from '../../firebase/firebaseInit';
import { setOrderCoordenatesAction } from '../../actions/orderAction';
import userHome from '../../assets/static/user-home.png';

const LocationModalMap = () => {
  const dispatch = useDispatch();

  const orderCoordenates = useSelector((state) => state.orderCoordenates);
  const shop = useSelector((state) => state.currentShop);
  const user = useSelector((state) => state.user);

  // const [searchLocation, setSearchLocation] = useState({});
  const [infoWindowContent, setInfoWindowContent] = useState('');
  const [shopUrl, setShopUrl] = useState('');

  let context;

  if (useContext(FirebaseContext) !== null) {
    context = useContext(FirebaseContext);
  }

  const fetchGeocodeResults = async (lat, lng) => {
    try {
      const { data, status } = await axios({
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
          latlng: `${lat},${lng}`,
          key: googleApiKey,
        },
        method: 'GET',
      });

      if (status === 200 || data.status === 'OK') {
        // setGeocoderResults(data.results);
        return data.results[0].formatted_address;
      }
      console.log(
        `Geocode no fue exitoso por el seguiente motivo: ${data.status}`
      );

      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnDragEnd = (e) => {
    fetchGeocodeResults(e.latLng.lat(), e.latLng.lng())
      .then((res) => {
        console.log(res);
        setInfoWindowContent(res);
        dispatch(
          setOrderCoordenatesAction(
            JSON.parse(
              JSON.stringify({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              })
            )
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const useBrowserGeolocation = () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // const userCoordenates = {
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude,
          // };
          // dispatch(setOrderCoordenatesAction(userCoordenates));
          dispatch(
            setOrderCoordenatesAction({
              lat: Number(user.user_lat),
              lng: Number(user.user_lng),
            })
          );
        },
        function () {
          console.log('error browser location');
        }
      );
    } else {
      // Browser doesn't support Geolocation
      // Use default user location
      dispatch(
        setOrderCoordenatesAction({
          lat: Number(user.user_lat),
          lng: Number(user.user_lng),
        })
      );

      console.log('default user location');
    }
  };

  // Carga de imagen
  useEffect(() => {
    useBrowserGeolocation();
    // user address
    fetchGeocodeResults(Number(user.user_lat), Number(user.user_lng))
      .then((res) => {
        console.log(res);
        setInfoWindowContent(res);
      })
      .catch((error) => {
        console.log(error);
      });
    // Shop image
    if (context.storageRef !== null || context.storageRef !== undefined) {
      context.storageRef
        .child(`shops/${shop.image}`)
        .getDownloadURL()
        .then((url) => {
          setShopUrl(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={orderCoordenates}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {/* User location */}
      <Marker
        position={orderCoordenates}
        draggable={true}
        onDragEnd={handleOnDragEnd}
        label={infoWindowContent}
        defaultIcon={{
          url: userHome,
          scaledSize: new google.maps.Size(50, 60),
        }}
      />

      {/* new google.maps.Geocoder() */}
      {/* Current shop location */}
      <Marker
        position={{
          lat: Number(shop.shop_lat),
          lng: Number(shop.shop_lng),
        }}
        icon={{
          url: shopUrl,
          scaledSize: new google.maps.Size(80, 100),
        }}
      />
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(LocationModalMap));

export default WrappedMap;
