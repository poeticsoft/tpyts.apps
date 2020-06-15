import React from 'react'
import Stores from './showcases/stores'
import Search from './showcases/search'
import Terms from './showcases/terms'

const Showcase = props => {

  return <div 
    className="Showcase"
  >
    <Stores />
    <Search />
    <Terms />
  </div>
}

export default Showcase
