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

  console.log(props)

  const inc = e => {    

    e.stopPropagation()

    props.dispatch(Actions.orderPrepareService(props.serviceid))
  }
  
  return <div className="PedirQuitar">          
    <Button 
      shape="circle"
      onClick={ e => inc(e, -1) }
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
      onClick={ e => inc(e, 1) }
    >
      <Icons.PlusOutlined />
    </Button>
  </div>
})

export default PedirQuitar