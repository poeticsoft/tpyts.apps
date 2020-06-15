import React from 'react'
import { connect } from 'react-redux'

const Message = connect(
  state => ({  
    message: state.ui.message
  })
)(props => {  

  return <></>

  return (
    props.message &&
    props.message.text
  ) ?
  <div 
    className= {`
      Message
      ${ props.message.type }  
    `}
  >
    { props.message.text}
  </div>
  :
  <></>
})

export default Message;
