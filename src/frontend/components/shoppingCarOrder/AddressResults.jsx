import React from 'react';

const AddressResults = ({
  geocoderResults,
  handleClick,
  locationModalMap,
  // searchAddress
}) => {
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
                      onClick={(e) =>
                        handleClick(e, addressItem, locationModalMap)}
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
