import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const PedirQuitar = connect(state => ({
  orderservices: state.order.services
}))(props => {

  const add = e => props.dispatch(Actions.orderPrepareService(props.serviceid))

  const remove = e => {

    const orderservice = props.orderservices
    .find(
      orderservice => parseInt(orderservice.serviceid) == parseInt(props.serviceid)
    )

    props.dispatch(Actions.orderTryRemoveService(orderservice.index))
  }
  
  return <div className="PedirQuitar">          
    <Button 
      shape="circle"
      onClick={ remove }
    >
      <Icons.MinusOutlined />
    </Button>   
    <span>
      { 
        props.orderservices
        .filter(service => service.serviceid == props.serviceid )
        .length
      }
    </span> 
    <Button 
      shape="circle"
      onClick={ add }
    >
      <Icons.PlusOutlined />
    </Button>
  </div>
})

export default PedirQuitar