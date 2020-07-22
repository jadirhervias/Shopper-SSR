/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AddressResults from '../shoppingCarOrder/AddressResults';
import SearchLocationModalMap from '../maps/SearchLocationModalMap';
import { setOrderCoordenatesAction } from '../../actions/orderAction';
import googleApiKey from '../../credentials/googleApiKey';
import '../../assets/styles/components/SearchMapModal.scss';

const SearchMapModal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [searchAddress, setSearchAddress] = useState('');
  const [geocoderResults, setGeocoderResults] = useState([]);

  const fetchGeocodeResults = async (address) => {
    try {
      const { data, status } = await axios({
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
          address,
          key: googleApiKey,
        },
        method: 'GET',
      });

      if (status === 200 || data.status === 'OK') {
        // setGeocoderResults(data.results);
        return data.results;
      }
      console.log(
        `Geocode no fue exitoso por el seguiente motivo: ${data.status}`
      );

      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.value === '') {
      setGeocoderResults([]);
    }
    setSearchAddress(e.target.value);
    // TODO: Habilitar para produccion
    // fetchGeocodeResults(e.target.value)
    //   .then((res) => {
    //     console.log(res);
    //     setGeocoderResults(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleFindLocation = (e) => {
    e.preventDefault();
    console.log('ON CLICK FIND LOCATION');
    console.log(searchAddress);
    fetchGeocodeResults(searchAddress)
      .then((res) => {
        console.log(res);
        setGeocoderResults(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // Remove chosen location
    setSearchAddress('');
    setGeocoderResults([]);
    dispatch(
      setOrderCoordenatesAction({
        lat: Number(user.user_lat),
        lng: Number(user.user_lng),
      })
    );
  };

  useEffect(() => {
    console.log('location modal mounted!');
    return () => {
      console.log('location modal unmounted!');
      setSearchAddress('');
    };
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
                  onClick={handleCancel}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="d-flex flex-row bd-highlight justify-content-center my-2">
                <h3>Ubica tus tiendas preferidas cerca de ti</h3>
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
                  />
                </div>
                <div className="bd-highlight p-2">
                  <input
                    type="submit"
                    value="Buscar"
                    className="btn btn-md btn-info"
                    onClick={handleFindLocation}
                    disabled={searchAddress === ''}
                  />
                </div>
              </div>

              <AddressResults geocoderResults={geocoderResults} />

              <div className="d-flex flex-row bd-highlight justify-content-center align-items-center p-4">
                <div style={{ height: '400px', width: '600px' }}>
                  <SearchLocationModalMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '400px' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
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
