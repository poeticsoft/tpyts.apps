import React from 'react'
import { connect } from 'react-redux'
import Stores from './showcases/stores'
import Categories from './showcases/categories'
import Search from './showcases/search'

const Cover = connect(state => ({ 
  map: state.ui.map
}))(props => {  

  return <div 
    className="Showcase"
  >
    <Stores />
    <Categories />
    <Search />
  </div>
})

export default Cover
