/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  showProductsByShop,
  showProductsBySubcategory,
  filterProductsByBrand,
  showLoading,
  hideLoading,
  setError,
} from './index';

export const showShop = (id) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data, status } = await axios({
        url: `/shops/${id}`,
        method: 'GET',
      });

      dispatch(hideLoading());

      // state setup
      dispatch(showProductsByShop(data));

      if (data.categories && data.categories.length > 0) {
        // First products to display
        dispatch(
          showProductsBySubcategory(
            data.categories[0].sub_categories[0].products
          )
        );
      } else {
        dispatch(showProductsBySubcategory([]));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const showProducts = (idSubCategoria) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data, status } = await axios({
        url: `/subcategories/${idSubCategoria}`,
        method: 'GET',
      });

      dispatch(hideLoading());

      // Clean filters
      dispatch(filterProductsByBrand(null));
      dispatch(showProductsBySubcategory(data));
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
