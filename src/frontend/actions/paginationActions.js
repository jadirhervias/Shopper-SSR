import {
  setNumber,
  setSize,
  setPageIsLast,
  setPageIsEmpty,
  setTotalPages,
  setTotalElements,
  setNumberOfElements,
} from './index';

export const setPageNumber = (pageNumber) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(setNumber(pageNumber));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const setPaginationSize = (size) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(setSize(size));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const setCurrentPageIsLast = (isLast) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(setPageIsLast(isLast));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const setCurrentPageIsEmpty = (isEmpty) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(setPageIsEmpty(isEmpty));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const setCurrentPageNumberOfElements = (numberOfElements) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(setNumberOfElements(numberOfElements));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const setPaginatinoTotalPages = (totalPages) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(setTotalPages(totalPages));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const setPaginatinoTotalElements = (totalElements) => {
  return async (dispatch) => {
    try {
      // state setup
      dispatch(setTotalElements(totalElements));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};
