import React from 'react'
import { groupBy } from 'lodash'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'
import PedirQuitar from '../common/pedirquitar'

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
    <div className="Data">
      <div className="Title">{ service.post_title }</div>      
      <PedirQuitar 
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
        
      }
    </div>
    <div className="TotalOrder">
      <div className="Text">
        Total
      </div>
      <div className="Number">
        {          
          props.order.services
          .reduce((count, service) => {

            const price = props.services[service.serviceid].servicebasic.price ?
              parseFloat(props.services[service.serviceid].servicebasic.price.replace(',', '.'))
              :
              0

            return count + (
              props.order.services[service.serviceid]
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