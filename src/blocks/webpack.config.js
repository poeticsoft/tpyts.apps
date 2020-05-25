const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const LiveReloadPlugin = require('webpack-livereload-plugin')
const config = require('./config')

module.exports = env => {

  let mode;
  let externals;
  const ext = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@wordpress/components': 'wp.components'
  };
  switch(env) {

    case 'prod':

      mode = 'production';
      externals = ext;

      break;

    case 'wpdev':
      
      mode = 'development';
      externals = ext;  

      break; 
    
    case 'dev':
    default:
      
      mode = 'development';
      externals = {};  

      break;     
  }

  const common = {
    context: __dirname,
    mode,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [          
            { 
              loader: "babel-loader",
              options: {
                presets: ["@babel/react"]
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: '[id].css',
      }),
      new LiveReloadPlugin({
        protocol: 'http',
        hostname: 'localhost',
        delay: env == 'wpdev' ? 6000 : 0,
        appendScriptTag: false,
      })
    ],
    externals,
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };

  const app = Object.assign({}, common, {
    name: 'tpyts-block-app',
    entry: [
      './app/src/main.js',
      './app/src/main.scss'
    ],
    output: {
      path: config.workpath + '/app',
      filename: 'main.js'
    }
  });

  return [  
    app
  ]
}
