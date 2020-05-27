const fs = require('fs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const EventHooksPlugin = require('event-hooks-webpack-plugin');

module.exports = env => {

  // env = admin, client, provider, dealer, theme

  const mode = 'dev'
  const app = env ? env : 'theme'
  const destpath = path.join(
    'C:\\trabajo\\manperez\\tpyts\\wp-content\\themes\\tpyts\\',
    // app == 'theme' ? '' : '\\apps'
    app == 'theme' ? '' : '\\apps'
  )
  const themepath = '/wp-content/themes/tpyts/'

  return {
    context: __dirname,
    mode: mode == 'prod' ? 'production' : 'development',
    devtool: mode == 'prod' ? 'none' : app != 'theme' ? 'source-map' : 'none',
    entry: {
      ['main']: `webpack-polyfill-injector?${JSON.stringify({
        modules: [
          `./src/${ app }/main.js`,
          `./src/${ app }/main.scss`
        ]
      })}!`
    },
    output: {
      path: destpath,
      publicPath: '/',
      filename: `${ app }.js`
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
            outputPath: app != 'theme' ? '../fonts/' : 'fonts/',
            publicPath: app != 'theme' ? '../fonts/' : 'fonts/',
          }
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {         
            esModule: false,
            name: '[name].[ext]',
            outputPath: app != 'theme' ? '../assets/' : 'assets',
            // publicPath: app != 'theme' ? themepath + 'assets' : 'assets'
            publicPath: app != 'theme' ? '../assets/' : 'assets'
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
        ]
      }),
      new MiniCssExtractPlugin({
        filename: app == 'theme' ? 'style.css' : `${ app }.css`
      }),
      new LiveReloadPlugin({
        protocol: 'http',
        hostname: 'localhost',
        delay: 1000,
        appendScriptTag: true
      }),
      new EventHooksPlugin({
        'done': () => {           

          const jsfile = path.join(destpath, `${ app }.js`)

          if(app != 'theme') { 
            fs.readFile(jsfile, (error, data) => {

              if(error) { return console.log(error) }
              
              const js = (data + '')
              const polyfillsrelative = js.replace('/polyfills.js', 'polyfills.js')
              fs.writeFileSync(jsfile, polyfillsrelative)
            })
          } else {

            if(fs.existsSync(jsfile)) fs.unlinkSync(jsfile)
          }
        }
      })
    ],
    resolve: {
      alias: {
        assets: path.join(__dirname, 'assets'),
        fonts: path.join(__dirname, 'fonts'),
        utils: path.join(__dirname, 'utils'),
        common: path.join(__dirname, 'src', 'common'),
        config: path.join(__dirname, 'src', app, 'config'),
        rdx: path.join(__dirname, 'src', app, 'redux'),
        comps: path.join(__dirname, 'src', app, 'components')
      },
      extensions: ['.js']
    }
  }
}