import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const Quantity = connect(state => ({
  orderservices: state.ui.order.services
}))(props => { 

  const inc = (e, n) => {    

    e.stopPropagation()

    props.dispatch(Actions.uiIncrementOrderService({
      serviceid:props.serviceid,
      inc: n
    }))
  }
  
  return <div className="Quantity"> 
    <Button 
      shape="circle"
      onClick={ e => inc(e, -1) }
      className="Down"
      disabled={ 
        !props.orderservices[props.serviceid]
        ||
        props.orderservices[props.serviceid] < 1 
      }
    >
      <Icons.DownOutlined />
    </Button>   
    <div className="Number">{ props.orderservices[props.serviceid] || 0 }</div>       
    <Button 
      shape="circle"
      onClick={ e => inc(e, 1) }
      className="Up"
    >
      <Icons.UpOutlined/>
    </Button>
  </div>
})

export default Quantity