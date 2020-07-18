export const textValidator = (...data) => {
  const validationResults = data.map((fieldValue) => {
    if (
      fieldValue.trim() === '' ||
      /[^a-zA-Z -]/.test(fieldValue) ||
      fieldValue.trim().length > 120
    ) {
      return false;
    }
    return true;
  });

  return validationResults.reduce(
    (accumulator, next) => accumulator && next,
    true
  );
};

export const emailValidator = (...data) => {
  const validationResults = data.map((fieldValue) => {
    if (
      fieldValue.trim() === '' ||
      !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(fieldValue) ||
      fieldValue.trim().length > 120
    ) {
      return false;
    }
    return true;
  });

  return validationResults.reduce(
    (accumulator, next) => accumulator && next,
    true
  );
};

export const passwordValidator = (...data) => {};

export const loginValidator = (...data) => {};

export const creditCardValidator = (...data) => {};

export const dateFormatValidator = (...data) => {};

export const trimInput = (input) => {
  return input.trim();
};

export const notEmpty = (input) => {
  if (
    input.trim() === '' ||
    input === '' ||
    input === undefined ||
    input === null
  ) {
    return false;
  }

  return true;
};

// Form data tiene que ser un objeto de un solo nivel de profundidad con String values
export const trimFilter = (formData, onlyTrim = false) => {
  const keyValue = Object.entries(formData);

  if (onlyTrim) {
    const results = keyValue.map((propertie) => [
      propertie[0],
      propertie[1].trim(),
    ]);
    return Object.fromEntries(results);
  }

  const results = keyValue.map((propertie) => [
    propertie[0],
    propertie[1].trim().replace(/\s+/g, ''),
  ]);
  return Object.fromEntries(results);
};
