import React from 'react'
import ReactDOM from 'react-dom'
import App from 'comps/app'

/* Render */

const render = () => ReactDOM.render(
  <App />, 
  document.getElementById('TPYTS')
)

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded', 
    render
  )

} else {

  render();
}
