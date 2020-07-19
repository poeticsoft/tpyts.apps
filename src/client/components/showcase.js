import React from 'react'
import { connect } from 'react-redux'
import Stores from './showcases/stores'
import Search from './showcases/search'
import Terms from './showcases/terms'

const Showcase = connect(state => ({
  showcase: state.ui.showcase,
  search: state.search
}))(props => {

  return <div 
    className="Showcase"
  >
    <div className="ShowcaseTitle">
      <span className={` ${ !props.showcase ? 'Visible' : '' } `}>Restaurantes & Menú</span>
      <span className={` ${ props.showcase == 'search' ? 'Visible' : '' } `}>Buscando { props.search.searchtext }</span>
    </div>
    <Stores />
    <Search />
    <Terms />
  </div>
})

export default Showcase
