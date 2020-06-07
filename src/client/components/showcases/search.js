import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'

const Search = connect(state => ({
  showcase: state.ui.showcase
}))(props => {  
  
  return props.showcase == 'search' && 
  <div className="Search">
    SEARCH
  </div>
})

export default Search