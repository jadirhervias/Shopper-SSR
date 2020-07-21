import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paginateUserShoppingCars } from '../../actions/userActions';
import '../../assets/styles/components/PaginationSection.scss';

const ShoppingCarsPagination = () => {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.pagination);
  const user = useSelector((state) => state.user);
  const [middlePages, setMiddlePages] = useState([]);

  const handleNextPageClick = (e) => {
    e.preventDefault();
    dispatch(paginateUserShoppingCars(user.id, pagination.number + 1));
  };

  const handleBackPageClick = (e) => {
    e.preventDefault();
    dispatch(paginateUserShoppingCars(user.id, pagination.number - 1));
  };

  const handleSelectPageClick = (e, page) => {
    e.preventDefault();
    dispatch(paginateUserShoppingCars(user.id, page));
  };

  const populateMiddlePages = (currentUIPageNumber, limit) => {
    const middlePagesArray = [];
    if (currentUIPageNumber >= 3 && currentUIPageNumber < limit - 1) {
      // entre 3 y 1 menos pagina semifinal
      setMiddlePages([
        currentUIPageNumber - 1,
        currentUIPageNumber,
        currentUIPageNumber + 1,
      ]);
      return;
    }
    if (currentUIPageNumber === 1 || currentUIPageNumber === 2) {
      // pagina 1 o 2
      let counter;
      if (currentUIPageNumber === 1) {
        counter = currentUIPageNumber + 1;
      } else {
        counter = currentUIPageNumber;
      }
      while (counter < limit) {
        middlePagesArray.push(counter);
        counter++;
      }
      setMiddlePages(middlePagesArray);
      return;
    }
    if (currentUIPageNumber === limit - 1 || currentUIPageNumber === limit) {
      // pagina final o semifinal
      let counter;
      if (currentUIPageNumber === limit) {
        counter = currentUIPageNumber - 1;
      } else {
        counter = currentUIPageNumber;
      }
      while (counter > 1) {
        if (middlePagesArray.length === 3) {
          break;
        }
        middlePagesArray.unshift(counter);
        counter--;
      }
      setMiddlePages(middlePagesArray);
    }
  };

  useEffect(() => {
    populateMiddlePages(pagination.number + 1, pagination.totalPages);
  }, [pagination.number, pagination.totalPages]);

  return (
    <div className="d-flex flex-md-row flex-wrap align-content-center px-4 pt-4 pb-2">
      <div className="p-2 bd-highlight">
        <h2>Mis Carritos de Compra</h2>
      </div>
      <div className="p-2 flex-grow-1 bd-highlight" />
      <div className="p-2 bd-highlight">
        <span className="align-middle">{`Mostrando ${pagination.numberOfElements} de ${pagination.totalElements} resultados`}</span>
      </div>
      <div className="p-2 bd-highlight">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item">
              <button
                className="page-link arrow-character"
                type="button"
                tabIndex="-1"
                aria-disabled="true"
                onClick={handleBackPageClick}
                disabled={pagination.first}
              >
                {/* &laquo; */}
                ❮
              </button>
            </li>
            {/* First Page */}
            {pagination.totalPages > 1 && (
              <li
                className={`page-item ${
                  pagination.number === 0 ? 'custom-active' : ''
                }`}
              >
                <button
                  type="button"
                  className="page-link custom-page-item"
                  onClick={(e) => handleSelectPageClick(e, 0)}
                >
                  1...
                </button>
              </li>
            )}
            {/* Middle pages */}
            {pagination.totalPages > 1 && (
              <>
                {middlePages.map((UIpage) => (
                  <li
                    className={`page-item ${
                      UIpage === pagination.number + 1 ? 'custom-active' : ''
                    }`}
                    key={UIpage}
                  >
                    <button
                      type="button"
                      className="page-link custom-page-item"
                      onClick={(e) => handleSelectPageClick(e, UIpage - 1)}
                    >
                      {UIpage}
                    </button>
                  </li>
                ))}
              </>
            )}
            {/* Last Page */}
            {pagination.totalPages > 1 && (
              <li
                className={`page-item ${
                  pagination.number + 1 === pagination.totalPages ?
                    'custom-active' :
                    ''
                }`}
              >
                <button
                  type="button"
                  className="page-link custom-page-item"
                  onClick={(e) =>
                    handleSelectPageClick(e, pagination.totalPages - 1)}
                >
                  {`...${pagination.totalPages}`}
                </button>
              </li>
            )}
            <li className="page-item">
              <button
                className="page-link arrow-character"
                type="button"
                aria-disabled="true"
                onClick={handleNextPageClick}
                disabled={pagination.last}
              >
                {/* &raquo; */}
                ❯
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ShoppingCarsPagination;
