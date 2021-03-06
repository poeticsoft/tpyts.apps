const fs = require('fs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const EventHooksPlugin = require('event-hooks-webpack-plugin');

let mode, app, block

module.exports = env => {

  // env = [admin|client|provider|dealer|theme|block]-[mode]-[block] 
  const input = env || ''
  const params = input.split('-')
  const app = params[0] || 'theme'
  const mode = params[1] || 'dev'
  const block = params[2] || 'app'
  const externals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@wordpress/components': 'wp.components'
  }

  let wmode
  switch(mode) {

    case 'prod':

      wmode = 'production';
      wexternals = app == 'block' ? externals : {};

      break;

    case 'wpdev':
      
      wmode = 'development';
      wexternals = externals;  

      break; 
    
    case 'dev':
    default:
      
      wmode = 'development';
      wexternals = {};  

      break;     
  }

  const devtool = wmode == 'production' ?
    'none'
    :
    (
      app != 'theme'
      &&
      app != 'block'
    ) ? 
      'source-map' 
      : 
      'none'
  
  // const rootdestpath = 'E:\\tpyts\\tpyts\\wp-content\\themes\\tpyts\\'
  const rootdestpath = 'E:\\trabajo\\manperez\\tpyts\\wp-content\\themes\\tpyts\\'
  const apppath = app == 'theme' ?
      ''
      :
      (app == 'block') ?
        'plugin\\blocks\\' + block
        :
        'apps'  
  const destpath = path.join(rootdestpath, apppath)
  const srcpath = app == 'block' ?
    'blocks/' + block
    :
    app 

  const themepath = '/wp-content/themes/tpyts/'

  let plugins = [
    new MiniCssExtractPlugin({
      filename: app == 'theme' ? 
        'style.css'
        :        
        app == 'block' ?
          'main.css'
          :
          app + '.css'
    }),
    new LiveReloadPlugin({
      protocol: 'http',
      hostname: 'localhost',
      delay: (
        app == 'block'
        ||
        app == 'theme'
      ) ? 10000 : 500,
      appendScriptTag: false
    }),
    new EventHooksPlugin({
      'done': () => {

        if(app != 'block') {

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
      }
    })
  ]  
  
  if(app != 'block' && app != 'theme') {

    plugins.push(new PolyfillInjectorPlugin({
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
    }))
  }

  const mainjs = (
    app == 'block' 
    || 
    app == 'theme'
  ) ? 
  './src/' +  srcpath + '/main.js'
  :
  './src/' +  srcpath + '/' + app + '.js'  

  const maincss = (
    app == 'block' 
    || 
    app == 'theme'
  ) ? 
  './src/' +  srcpath + '/main.scss'
  :
  './src/' +  srcpath + '/' + app + '.scss'

  const entrymodules = [
    mainjs,
    maincss
  ]

  const entry = (
    app == 'block' 
    || 
    app == 'theme'
  ) ? 
  entrymodules
  :
  {
    [(
      app == 'block' 
      || 
      app == 'theme'
    ) ? 
    'main'
    :
    app]: `webpack-polyfill-injector?${JSON.stringify({
      modules: entrymodules
    })}!`
  }

  console.log(app)
  console.log(wmode)
  console.log(wexternals)
  console.log(devtool)
  console.log(srcpath)
  console.log(destpath)
  console.log(entry)

  return {
    context: __dirname,
    mode: wmode,
    devtool: devtool,
    entry: entry,
    output: {
      path: destpath,
      publicPath: '/',
      filename: '[name].js'
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
            publicPath: (
              app != 'theme'
              &&
              app != 'block'
            ) ? '/wp-content/themes/tpyts/apps/fonts' : 'fonts'
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
            publicPath: (
              app != 'theme'
              &&
              app != 'block'
            ) ? '/wp-content/themes/tpyts/apps/assets' : 'assets'
          }
        }
      ]
    },
    plugins: plugins,
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