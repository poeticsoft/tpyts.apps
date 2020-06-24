import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import Service from 'common/components/service'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'

const NotFound = connect(state => ({
  search: state.ui.search
}))(props => {

  return <div
    className="NotFound"
  >
    <span className="Text">No encontramos</span>
    <span className="SearchText">{ props.search.text }</span>
  </div>
})

const Search = connect(state => ({
  search: state.ui.search,
  services: state.wp.slotbyid.services
}))(props => { 

  const close = e => {

    e.stopPropagation()

    props.dispatch(Actions.uiSetShowcaseActive(null))
    props.dispatch(Actions.uiSetSearchStatus({ status: 'hidden' }))
  }
  
  return <div
    className={`
      Search
      ${ props.search.status }
    `}
  >
    {
      (
        props.services
        &&
        props.search.results.length
      ) ? <div 
        className="Results"
      >
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
      :
      <NotFound />
    }
    <Button
      className="Close"
      icon={ <Icons.CloseOutlined /> }
      shape="circle"
      size="large"
      onClick={ close }
    />
  </div>
})

export default Search