import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'

export const ToppingsList = connect(state => ({
  services: state.wp.slotbyid.services,
  toppings: state.wp.slotbyid.toppings,
  order: state.order
}))(props => {
  
  const orderservice = props.order.services[props.order.toppingsserviceindex]
  const serviceToppingIds = props.services[orderservice.serviceid].servicebasic.toppings.split('|')

  const close = e => {

    props.dispatch(Actions.orderServiceToppingsList(null))
  }

  const addTopping = (e, toppingid) => {

    props.dispatch(Actions.orderServiceAddTopping(toppingid))
  }

  return <div className="ToppingList">
    <div className="Wrapper">
      <div className="Choose">
        <div className="ListTitle">
          Elige complementos
        </div>
        <Button 
          className="CloseList"
          shape="circle"
          icon={ <Icons.CloseOutlined /> }
          onClick={ close }
        />
      </div>
      <div className="List">
        {
          serviceToppingIds
          .filter(toppingid => !orderservice.toppings.includes(toppingid))
          .map((toppingid, index) => <div
            className="Topping"
            key={ index }
          >
            <div className="ToppingTitle">{ props.toppings[toppingid].post_title }</div>
            <div className="ToppingPrice">
              <span className="Number">
                { props.toppings[toppingid].toppingbasic.price }
              </span>
              <span className="Currency">
                €
              </span>
            </div>            
            <Button 
              className="AddTopping"
              shape="circle"
              icon={ <Icons.CheckOutlined /> }
              onClick={ e => addTopping(e, toppingid) }
            />
          </div>)
        }
      </div>
    </div>
  </div>
})