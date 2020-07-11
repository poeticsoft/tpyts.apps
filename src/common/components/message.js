import React from 'react'
import { connect } from 'react-redux'

const Message = connect(
  state => ({  
    message: state.ui.message
  })
)(props => {

  return <div 
    className= {`
      Message
      ${ props.message ? props.message.type : ''  }  
    `}
  >
    { props.message ? props.message.text : '' }
  </div>
})

export default Message;
