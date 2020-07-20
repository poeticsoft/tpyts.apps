import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const Pedir = props => { 

  const add = e => {    

    e.stopPropagation()

    props.dispatch(Actions.orderPrepareService(props.serviceid))
  }
  
  return <div className="Pedir">       
    <Button 
      shape="round"
      onClick={ add }
    >
      <Icons.PlusOutlined />
      <span>1</span>
    </Button>
  </div>
}

export default Pedir