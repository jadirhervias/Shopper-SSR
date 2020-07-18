export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};

export const addValueToLocalStorage = (key, dataToAdd) => {
  let list = [];

  if (localStorage.getItem(key)) {
    list = JSON.parse(localStorage.getItem(key));
  }
  list.push(dataToAdd);
  localStorage.setItem(key, JSON.stringify(list));
};

export const removeValueToLocalStorage = (key, dataToRemove) => {
  const itemStorage = JSON.parse(localStorage.getItem(key));
  const newData = itemStorage.filter(
    (element) => element.id !== dataToRemove.id
  );
  localStorage.setItem(key, JSON.stringify(newData));
};
