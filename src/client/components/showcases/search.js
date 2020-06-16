import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import Service from './service'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'

const Search = connect(state => ({
  search: state.ui.search,
  services: state.wp.slotbyid.services
}))(props => {  

  const close = e => {

    e.stopPropagation()

    props.dispatch(Actions.uiSetShowcaseActive(null))
    props.dispatch(Actions.uiSetSearchStatus({ status: 'hidden' }))
  }
  
  return props.services ? <div
    className={`
      Search
      ${ props.search.status }
    `}
  >
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
    <Button
      className="Close"
      icon={ <Icons.CloseOutlined /> }
      shape="circle"
      size="large"
      onClick={ close }
    />
  </div>
  :
  <></>
})

export default Search