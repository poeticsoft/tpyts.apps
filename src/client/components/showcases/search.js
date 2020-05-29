import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'

const Search = connect(state => ({
  shops: state.fb.shops.data,
  services: state.fb.services.data
}))(props => {  
  
  return <div className="Showcase Search">
    SEARCH
  </div>
})

export default Search