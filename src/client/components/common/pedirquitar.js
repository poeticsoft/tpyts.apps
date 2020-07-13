import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const PedirQuitar = connect(state => ({
  orderservices: state.ui.order.services
}))(props => { 

  const inc = e => {    

    e.stopPropagation()

    // props.dispatch(Actions.uiPrepareServiceForOrder(props.serviceid))
  }
  
  return <div className="PedirQuitar">          
    <Button 
      shape="circle"
      onClick={ inc }
    >
      <Icons.MinusOutlined />
    </Button>   
    <span>{ 0 }</span> 
    <Button 
      shape="circle"
      onClick={ inc }
    >
      <Icons.PlusOutlined />
    </Button>
  </div>
})

export default PedirQuitar