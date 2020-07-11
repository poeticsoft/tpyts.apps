const fs = require('fs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const EventHooksPlugin = require('event-hooks-webpack-plugin');

module.exports = () => ({
  context: __dirname,
  mode: 'production',
  devtool: 'none',
  entry: {
    main: `webpack-polyfill-injector?${JSON.stringify({
      modules: [
        './src/store/main.js',
        './src/common/scss/main.scss'
      ]
    })}!`
  },
  output: {
    path: 'E:\\trabajo\\manperez\\tpyts\\wp-content\\themes\\tpyts\\apps\\',
    publicPath: '/',
    filename: 'store.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [          
          { 
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
        ]
      },
      /* LESS ANTD */
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader', 
            options: {
              lessOptions: { 
                modifyVars: {
                  'primary-color': '#008f36',
                  'link-color': '#008f36',
                  'border-radius-base': '0'
                },
                javascriptEnabled: true,
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {          
          esModule: false,
          name: '[name].[ext]',
          outputPath: 'fonts',
          publicPath: '/wp-content/themes/tpyts/apps/fonts'
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: '[name].[ext]',
          outputPath: 'assets',
          publicPath: '/wp-content/themes/tpyts/apps/assets'
        }
      }
    ]
  },
  plugins: [
    new PolyfillInjectorPlugin({
      singleFile: true,
      polyfills: [
        'Array.prototype.fill',
        'Array.prototype.find',
        'Array.prototype.findIndex',
        'String.prototype.startsWith',
        'String.prototype.includes',
        'Array.from',
        'Object.entries',
        'Object.values',
        'Object.assign', 
        'fetch',
        'Promise',
        'Math.hypot'
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new LiveReloadPlugin({
      protocol: 'http',
      hostname: 'localhost',
      delay: 300,
      appendScriptTag: false
    }),
    new EventHooksPlugin({
      'done': () => {

        /*

        const mainfile = path.join(config.path, 'main.js')
        fs.readFile(mainfile, (error, data) => {

          if(error) { return console.log(error) }
          
          const main = (data + '')
          const polyfillsrelative = main.replace('/polyfills.js', 'polyfills.js')
          fs.writeFileSync(mainfile, polyfillsrelative)
        })
        */
      }
    }),
  ],
  resolve: {
    alias: {
      assets: path.join(__dirname, 'assets'),
      fonts: path.join(__dirname, 'fonts'),
      utils: path.join(__dirname, 'utils'),
      common: path.join(__dirname, 'src', 'common'),
      config: path.join(__dirname, 'src', 'store', 'config'),
      rdx: path.join(__dirname, 'src','store', 'redux'),
      comps: path.join(__dirname, 'src', 'store', 'components')
    },
    extensions: ['.js']
  }
})