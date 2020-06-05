/* eslint-disable operator-linebreak */
/* eslint-disable indent */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

const entry = ['./src/frontend/index.js'];

if (!isProd) {
  entry.push(
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'
  );
}

module.exports = {
  entry,
  // devtool: isProd ? 'hidden-source-map' : 'cheap-source-map',
  mode: isProd ? 'production' : 'development',
  // Si hay problema con dotenv
  // node: {
  //   fs: 'empty',
  // },
  output: {
    path: isProd ? path.resolve(__dirname, 'src/server/public') : '/',
    // isProd ?
    // path.join(process.cwd(), './src/server/public')
    // : '/',
    filename: isProd ? 'assets/app-[hash].js' : 'assets/app.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: isProd ? [new TerserPlugin()] : [],
    // VendorFile para separar la lógica propia de la aplicación de la lógica que se importa
    // y que se guardará en el caché del navegador
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: isProd ? 'assets/vendor-[hash].js' : 'assets/vendor.js',
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some(
              (chunk) =>
                chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name)
            );
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     data: `
          //       @import "${path.resolve(__dirname, 'src/frontend/assets/styles/Vars.scss')}";
          //       @import "${path.resolve(__dirname, 'src/frontend/assets/styles/Media.scss')}";
          //       @import "${path.resolve(__dirname, 'src/frontend/assets/styles/Base.scss')}";
          //     `,
          //   },
          // },
        ],
      },
      {
        // test: /\.(png|gif|jpg|ico)$/,
        test: /\.(png|gif|jpe?g|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // nuevo
              context: path.resolve(__dirname, 'assets'),
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    // PARA POSTCSS
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: [
    //       autoprefixer(),
    //     ],
    //   },
    // }),
    // para refrescar en caliente la app
    !isProd ? new webpack.HotModuleReplacementPlugin() : () => {},
    isProd
      ? new CompressionWebpackPlugin({
          test: /\.js$|\.css$/,
          filename: '[path].gz',
        })
      : () => {},
    isProd ? new ManifestPlugin() : () => {},
    // {
    // // Solución a las hashed keys del manifest.json
    //   map: (file) => {
    //     if (isProd) {
    //     // Remove hashes from keys created in CopyWebpackPlugin which does not correctly support manifest files
    //     // eslint-disable-next-line no-param-reassign
    //       file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
    //     }
    //     return file;
    //   },
    // }
    new MiniCssExtractPlugin({
      filename: isProd ? 'assets/app-[hash].css' : 'assets/app.css',
    }),
  ],
};
