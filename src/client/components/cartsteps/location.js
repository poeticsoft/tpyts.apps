import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'

const Location = connect(state => ({
}))(props => {  
  
  return props.actualstep == props.stepid ?
    <div className="Step Location">
      Location
    </div>
    :
    <></>
})

export default Location