import getManifest from '../getManifest';

let files = false;
if (process.env.NODE_ENV !== 'development') files = getManifest();

const renderFullPage = (html, preloadedState) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="${
  files ? files['main.css'] : 'assets/app.css'
}" type="text/css" />
      <title>Shopper</title>
    </head>
    <body>
      <noscript>Esta app igual corre con JavaScript deshabilitado</noscript>
      <div id="root">${html}</div>
      <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c'
  )}
      </script>

      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
      
      <script src="${
  files ? files['main.js'] : 'assets/app.js'
}"  type="text/javascript"></script>
      <script src="${
  files ? files['vendors.js'] : 'assets/vendor.js'
}" type="text/javascript"></script>
    </body>
    </html>`;
};

export default renderFullPage;

// const renderFullPage = (html, preloadedState, manifest) => {
//   const mainStyles = manifest ? manifest['main.css'] : '/assets/app.css';
//   const mainBuild = manifest ? manifest['main.js'] : '/assets/app.js';
//   const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
//   return (
//     `
//       <!DOCTYPE html>
//       <html lang="es">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <meta http-equiv="X-UA-Compatible" content="ie=edge">
//           <meta charset="utf-8" />
//           <link rel="stylesheet" href="${mainStyles}" type="text/css"/>
//           <title>Platfix</title>
//         </head>
//         <body>
//           <div id="app">${html}</div>
//           <script id="preloadedState">
//             window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
//           </script>
//           <script src="${mainBuild}" type="text/javascript"></script>
//           <script src="${vendorBuild}" type="text/javascript"></script>
//         </body>
//       </html>`
//   );
// };
