import React from 'react'
import { connect } from 'react-redux'
import Logo from 'assets/img/logo.svg'
import * as Icons from '@ant-design/icons'
import { debounce } from 'lodash'
import {
  Input
} from 'antd'
import * as Actions from 'rdx/actions'

const Tools = connect(state => ({ 
  wp: state.wp
}))(props => { 

  const launchSearch = text => props.dispatch(Actions.uiSearch(text))
  const launch = debounce(launchSearch, 500)
  
  const change = e => {

    e.target.value.length > 3 &&
    launch(e.target.value)
  }

  return <div 
    className={`
      Tools
      ${ !props.wp.ready ? 'Waiting' :  '' }
    `}
  >
    <div className="SearchShadow"></div>
    <div
      className="Logo"
    >
      <img src={ Logo} />
    </div>
    <div
      className="Search"
    >
      <Input  
        placeholder="Que te apetece?" 
        prefix={ <Icons.SearchOutlined /> }
        allowClear
        onChange={ change } 
      />    
    </div>
  </div>
})

export default Tools