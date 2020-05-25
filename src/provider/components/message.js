import React from 'react'
import { connect } from 'react-redux'

const Map = connect(
  state => ({  
    message: state.ui.message
  })
)(props => {

  

  return <div 
    className= {`
      Message
      ${ props.message.type }  
    `}
  >
    { props.message.text}
  </div>
})

export default Map;
