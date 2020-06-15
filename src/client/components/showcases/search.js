import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import Service from './service'

const Search = connect(state => ({
  search: state.ui.search,
  services: state.wp.slotbyid.services
}))(props => {  
  
  return props.services ? <div
    className={`
      Search
      ${ props.search.status }
    `}
  >
    <div
      className="SearchText"
    >
      { props.search.text }
    </div>
    <div className="Results">
      {
        props.search.results
        .map((result, index) => {

          return <Service
            key={ index }
            dispatch={ props.dispatch }
            { ...props.services[result.id] }
          />
        })
      }
    </div>
  </div>
  :
  <></>
})

export default Search