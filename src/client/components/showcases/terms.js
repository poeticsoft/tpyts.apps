import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'

const Terms = connect(state => ({
  terms: state.ui.terms
}))(props => {  
  
  return <div className={`
    Terms
    ${ props.terms.status }
  `}>
    TERMS
  </div>
})

export default Terms