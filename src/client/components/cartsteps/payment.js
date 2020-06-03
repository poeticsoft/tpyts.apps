import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'

const Payment = connect(state => ({
}))(props => {  
  
  return props.actualstep == props.stepid ?
    <div className="Step Payment">
      Payment
    </div>
    :
    <></>
})

export default Payment