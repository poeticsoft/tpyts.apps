import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'
import Pedir from '../common/pedir'

const OrderService = connect(state => ({
  services: state.wp.slotbyid.services,
  cart: state.ui.cart,
  order: state.ui.order
}))(props => {

  const service = props.services[props.serviceid]
  const price = service.servicebasic.price ?
    parseFloat(service.servicebasic.price.replace(',', '.'))
    :
    0
  const total = price * props.quantity

  const cancel = e => {

    e.stopPropagation()

    // props.dispatch(Actions.uiCancelOrderService(props.serviceid))
  }

  return <div 
    className="OrderService"
  >
    <div 
      className="Image"
      style={{
        backgroundImage: 'url(' + service.thumbnail + ')'
      }}
    />
    <Button 
      className="Cancel"
      shape="circle"
      icon={ <Icons.CloseOutlined /> }
      onClick={ cancel }
    />
    <div className="Data">
      <div className="Title">{ service.post_title }</div>      
      <Pedir 
        serviceid={ props.serviceid }
        dispatch={ props.dispatch }
      /> 
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
    <div className="TotalOrder">
      <div className="Text">
        Total
      </div>
      <div className="Number">
        {          
          Object.keys(props.order.services)
          .reduce((count, key) => {

            const price = props.services[key].servicebasic.price ?
              parseFloat(props.services[key].servicebasic.price.replace(',', '.'))
              :
              0

            return count + (
              props.order.services[key]
              *
              price
            )
          }, 0).toFixed(2).replace('.', ',')
        }
      </div>
      <div className="Currency">
        €
      </div>
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