import React from 'react'
import { connect } from 'react-redux'

const Splash = connect(state => ({ 
  wp: state.wp
}))(props => {  

  return !props.wp.ready && <div 
    className="Splash"
  >
    <img src={ props.wp.slot.datas.data.logo } />
  </div>
})

export default Splash
