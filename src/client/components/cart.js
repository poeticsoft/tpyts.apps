import React, {
  Fragment
} from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

// https://parzibyte.me/blog/en/2019/10/13/a-plugin-for-printing-thermal-printers-from-browser/

const Cart = connect(state => ({
  services: state.wp.slotbyid.services,
  cart: state.ui.cart,
  order: state.ui.order
}))(props => { 

  const openCart = e => {

    props.dispatch(Actions.uiSetCartStatus({
      opened: !props.cart.opened 
    }))
  }

  const selectStep = (e, key) => {

    e.stopPropagation()

    props.dispatch(Actions.uiSetCartStatus({
      actualstep: key 
    }))
  }
  
  return <div
    className={`
      Cart
      ${ 
        (
          props.cart.totalprice == 0
          &&
          props.cart.opened
        ) ? 'Opened' : '' 
      }
    `}
  >
    {
      props.services && <>
      <div className="Header">
        <div className="Servicios">
          <div className="Count">{ props.cart.totalservices }</div>
          <div className="Text">Raciones</div>
        </div>
        <div className="Price">
          <div className="Number">{ props.cart.totalprice }</div>
          <div className="Currency">€</div>
        </div>
        <div className="Tools">
          <Button
            icon={ <Icons.ShoppingCartOutlined /> }
            shape="circle"
            onClick={ openCart }
            disabled={ props.cart.totalprice == 0 }
          />
        </div>
      </div>
      <div className="Steps">
        {
          Object.keys(props.cart.steps)
          .map((key, index) => <Fragment key={ key }>
            {
              index > 0 && <i></i>
            }
            <Button           
              icon={ props.cart.steps[key].icon }
              shape="round"
              type={ 'primary' }
              onClick={ e => selectStep(e, key)}
            >
              { props.cart.steps[key].name }
            </Button>
          </Fragment>)
        }
      </div>  
      <div className="CartBody">
        {
          Object.keys(props.cart.steps)
          .map(key => {

            const Comp = props.cart.steps[key].comp

            return <Comp key={ key } />
          })
        }
      </div>
    </>} 
  </div>  
})

export default Cart