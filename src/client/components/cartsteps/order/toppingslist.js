import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'

export const ToppingsList = connect(state => ({
  toppings: state.wp.slotbyid.toppings,
  order: state.ui.order
}))(props => {

  const close = e => {

    
  }

  return <div className="ToppingList">
    <div className="Wrapper">
      <div className="Choose">
        <div className="ListTitle">
          Elige complememtos
        </div>
        <Button 
          className="CloseList"
          shape="circle"
          icon={ <Icons.CheckOutlined /> }
          onClick={ close }
        />
      </div>
      <div className="List">
        {
          props.order.toppings.list
          .map((toppingid, index) => <div
            className="ToppingInfo"
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
          </div>)
        }
      </div>
    </div>
  </div>
})