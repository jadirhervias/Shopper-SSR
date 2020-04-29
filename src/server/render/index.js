const renderFullPage = (html, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="${mainStyles}" type="text/css">
      <title>Shopper</title>
    </head>
    <body>
      <noscript>Esta app igual corre con JavaScript deshabilitado</noscript>
      <div id="root">${html}</div>
      <script src="${mainBuild}" type="text/javascript"></script>
      <script src="${vendorBuild}" type="text/javascript"></script>
    </body>
    </html>`;
};

export default renderFullPage;
