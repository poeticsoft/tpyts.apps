import React from 'react'
import ReactDOM from 'react-dom'
import App from 'comps/app'
import 'antd/dist/antd.css'

const render = () => ReactDOM.render(
  <App />, 
  document.getElementById('TPYTSAdmin')
)

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded', 
    render
  )

} else {

  render();
}
