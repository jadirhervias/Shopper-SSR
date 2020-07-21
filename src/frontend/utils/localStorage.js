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

export const loadState = () => {
  try {
    const serializedData = localStorage.getItem('state');
    if (serializedData === null) {
      return undefined; // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
    }
    return JSON.parse(serializedData); // Si encontramos con exito nuestro storage lo devolvemos.
  } catch (error) {
    return undefined; // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
  }
};

export const saveState = (state) => {
  try {
    const serializedData = JSON.stringify(state);
    localStorage.setItem('state', serializedData);
  } catch (error) {
    console.log('error guardando el state el local storage');
    console.log(error);
    // Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.
  }
};
