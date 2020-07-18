/* eslint-disable no-param-reassign */
export default (storageRef, products = []) => {
  const result = [];

  return products.map(async (product) => {
    try {
      const url = await storageRef
        .child(`products/${product.image}`)
        .getDownloadURL();
      console.log(`THE URLLLL: ${url}`);

      product = {
        ...product,
        image: url,
      };

      result.push(product);

      console.log(`THE PRODUCTTTTT: ${product}`);

      console.log(product);

      // document.getElementById(`product-item-${product.id}`).src = url;
      // document.getElementById(`product-modal-${product.id}`).src = url;
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          product = {
            ...product,
            image: 'http://placehold.it/200x250',
          };
          result.push(product);
          break;

        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          product = {
            ...product,
            image: 'http://placehold.it/200x250',
          };
          result.push(product);
          break;

        case 'storage/canceled':
          // User canceled the upload
          product = {
            ...product,
            image: 'http://placehold.it/200x250',
          };
          result.push(product);
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          product = {
            ...product,
            image: 'http://placehold.it/200x250',
          };
          result.push(product);
          break;
      }
    }
  });

  // return result;
};
