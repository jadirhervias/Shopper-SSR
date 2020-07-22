import React from 'react'; // { useState }
import { useDispatch } from 'react-redux';
import { setOrderCoordenatesAction } from '../../actions/orderAction';

const AddressResults = ({ geocoderResults }) => {
  const dispatch = useDispatch();
  // const [searchLocation, setSearchLocation] = useState({});
  // const [centerLocation, setCenterLocation] = useState({});

  const handleClick = (e, address) => {
    e.preventDefault();
    dispatch(
      setOrderCoordenatesAction(
        JSON.parse(JSON.stringify(address.geometry.location))
      )
    );
    // Clean local component states
  };

  return (
    <>
      {
        geocoderResults.length > 0 && (
          <div
            id="addressSelectResults"
            className="d-flex flex-row bd-highlight justify-content-center align-items-center"
          >
            <div className="bd-highlight p-2">
              <div id="autocomplete-list" className="autocomplete-items">
                <ul className="list-group list-group-flush">
                  {geocoderResults.map((addressItem) => (
                    <li
                      key={addressItem.place_id}
                      id={addressItem.place_id}
                      className="list-group-item list-group-item-action"
                      value={addressItem.formatted_address}
                      onClick={(e) => handleClick(e, addressItem)}
                    >
                      {addressItem.formatted_address}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
        // : (
        //   geocoderResults.length === 0 && searchAddress === '' && (
        //     <div className="d-flex flex-row bd-highlight justify-content-center align-items-center">
        //       No hay resultados que mostrar
        //     </div>
        //   )
        // )
      }
    </>
  );
};

export default AddressResults;
