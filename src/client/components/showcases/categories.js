import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'

const Categories = connect(state => ({
  showcase: state.ui.showcase
}))(props => {  
  
  return props.showcase == 'categories' && 
  <div className="Categories">
    CATEGORIES
  </div>
})

export default Categories