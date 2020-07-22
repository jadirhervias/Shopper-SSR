/* eslint-disable no-return-await */
import axios from 'axios';
import {
  showProductsByShop,
  showProductsBySubcategory,
  setNearestShops,
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

const asyncMapping = async (shops, storageRef) => {
  const urlShops = await Promise.all(
    shops.map(async (item) =>
      storageRef
        .child(`shops/${item.shop.image}`)
        .getDownloadURL()
        .then((url) => {
          const shopObj = {
            ...item.shop,
            image: url,
          };
          return {
            ...item,
            shop: shopObj,
          };
        })
        .catch((error) => {
          console.log(error);
          // return item;
          const shopObj = {
            ...item.shop,
            image: 'http://placehold.it/200x250',
          };
          return {
            ...item,
            shop: shopObj,
          };
        })
    )
  );
  return urlShops;
};

export const setNearestShopsAction = (lat, lng, storageRef) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data } = await axios({
        url: '/nearest-shops',
        method: 'GET',
        data: {
          lat,
          lng,
        },
      });

      dispatch(hideLoading());

      asyncMapping(data, storageRef)
        .then((res) => {
          // state setup
          dispatch(setNearestShops(res));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const setSearchProductsMatch = (idSubCategory, product) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data } = await axios({
        url: `/search-products/${idSubCategory}/${product.replace(
          /\s+/g,
          '_'
        )}`,
        method: 'GET',
      });

      dispatch(hideLoading());
      // Clean filters
      dispatch(filterProductsByBrand(null));
      dispatch(setNumber(0));
      dispatch(setSize(0));
      dispatch(setPageIsEmpty(false));
      dispatch(setPageIsFirst(true));
      dispatch(setPageIsLast(false));
      dispatch(setNumberOfElements(0));
      dispatch(setTotalElements(0));
      dispatch(setTotalPages(0));
      // dispatch(setSubcategoryId(idSubCategory));
      dispatch(showProductsBySubcategory(data));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};
