import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'

const Categories = connect(state => ({
  shops: state.fb.shops.data,
  services: state.fb.services.data
}))(props => {  
  
  return <div className="Showcase Categories">
    SHOPS
  </div>
})

export default Categories