import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'

const OrderService = connect(state => ({
  services: state.wp.slotbyid.services,
  cart: state.ui.cart
}))(props => {

  const service = props.services[props.serviceid]
  const price = parseFloat(service.servicebasic.price)
  const total = price * props.quantity

  return <div 
    className="OrderService"
  >
    <div 
      className="Image"
      style={{
        backgroundImage: 'url(' + service.thumbnail + ')'
      }}
    />
    <div className="Data">
      <div className="Title">{ service.post_title }</div>
      <div className="Comments">{ service.servicebasic.comments }</div>
      <div className="Calculo">
        <div className="Quantity">{ props.quantity }</div>
        <div className="Por">x</div>
        <div className="Price">
          <div className="Number">{ price }</div>
          <div className="Currency">€</div>
        </div>
        <div className="Igual">=</div>
        <div className="Total">
          <div className="Number">{ total }</div>
          <div className="Currency">€</div>
        </div>
      </div>      
    </div>
  </div>
})

const Order = connect(state => ({
  services: state.wp.slotbyid.services,
  order: state.ui.order,
  cart: state.ui.cart
}))(props => {  

  const goWhere = e => {

    props.dispatch(Actions.uiSetCartStatus({
      actualstep: 'location'
    }))
  }
  
  return <div 
    className={`
      Step
      Order
      ${ props.cart.actualstep == 'order' ? 'Visible' : '' }
    `}
  >
    <div className="Content">        
      {
        Object.keys(props.order.services)
        .map((key, index) => <OrderService
          key={ key }
          serviceid={ key }
          quantity={ props.order.services[key] }
        />)
      }
    </div>
    <div className="Next">
      <div className="Text">
        Donde lo llevamos?
      </div>
      <Button 
        shape="circle"
        icon={ <Icons.RightOutlined /> }
        onClick={ goWhere }
      />
    </div>
  </div>
})

export default Order