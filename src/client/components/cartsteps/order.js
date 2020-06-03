import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'

const OrderService = connect(state => ({
  services: state.wp.slotbyid.services
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
      </div>      
    </div>
  </div>
})

const Order = connect(state => ({
  services: state.wp.slotbyid.services,
  order: state.ui.order
}))(props => {  
  
  return props.actualstep == props.stepid ?
    <div className="Step Order">
      <div className="ServicesQuantity">        
        {
          Object.keys(props.order.services)
          .map((key, index) => <OrderService
            key={ key }
            serviceid={ key }
            quantity={ props.order.services[key] }
          />)
        }
      </div>
      <div className="Total">
        <div className="Text">
          Total
        </div>
        <div className=""></div>
      </div>
    </div>
    :
    <></>
})

export default Order