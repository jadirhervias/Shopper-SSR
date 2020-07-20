import axios from 'axios';
import {
  showProductsByShop,
  showProductsBySubcategory,
  filterProductsByBrand,
  showLoading,
  hideLoading,
  setSubcategoryId,
  setSubcategoryName,
  setNumber,
  setSize,
  setPageIsEmpty,
  setPageIsFirst,
  setPageIsLast,
  setNumberOfElements,
  setTotalElements,
  setTotalPages,
  setError,
} from './index';
// import productsAsyncMapping from '../utils/productsAsyncMapping';

export const showProducts = (
  idSubCategoria,
  page = 0,
  subcategoryName = null,
  storageRef = null
) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      let url;

      if (page !== null || page !== 0) {
        url = `/subcategories/${idSubCategoria}/${Number(page)}`;
      } else {
        url = `/subcategories/${idSubCategoria}/0`;
      }

      const { data } = await axios({
        url,
        method: 'GET',
      });

      dispatch(hideLoading());

      // Clean filters
      dispatch(filterProductsByBrand(null));

      // Pagination parameters
      dispatch(setNumber(data.number));
      dispatch(setSize(data.size));
      dispatch(setPageIsEmpty(data.empty));
      dispatch(setPageIsFirst(data.first));
      dispatch(setPageIsLast(data.last));
      dispatch(setNumberOfElements(data.numberOfElements));
      dispatch(setTotalElements(data.totalElements));
      dispatch(setTotalPages(data.totalPages));

      // const productsToLoad = await productsAsyncMapping(storageRef, data);

      //..............................

      // productsAsyncMapping(storageRef, data)
      //   .then((productsToLoad) => {
      //     console.log('prod w/ images:')
      //     console.log(productsToLoad)

      //     dispatch(showProductsBySubcategory(productsToLoad));
      //   }).catch((error) => {
      //     console.log(error)
      //   })

      // console.log('prod w/ images:')
      // console.log(productsToLoad)

      dispatch(setSubcategoryId(idSubCategoria));
      subcategoryName !== null && dispatch(setSubcategoryName(subcategoryName));
      dispatch(showProductsBySubcategory(data.content));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const showShop = (id) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data } = await axios({
        url: `/shops/${id}`,
        method: 'GET',
      });

      dispatch(hideLoading());

      // state setup
      dispatch(showProductsByShop(data));

      if (data.categories && data.categories.length > 0) {
        // First products to display
        const firstSubcategory = data.categories[0].sub_categories[0];
        dispatch(showProducts(firstSubcategory.id, 0, firstSubcategory.name));
      } else {
        dispatch(showProductsBySubcategory([]));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

// export const showNextPageProducts = (idSubCategoria) => {
//   return async (dispatch) => {
//     try {
//       const { data, status } = await axios({
//         url: `/subcategories/${idSubCategoria}`,
//         method: 'GET',
//       });

//       console.log(data);
//       dispatch(showProductsBySubcategory(data))

//     } catch (error) {
//       console.log(error);
//       dispatch(setError(error));
//     }
//   }
// };
