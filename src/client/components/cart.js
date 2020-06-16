import React, {
  Fragment
} from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Badge
} from 'antd'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

// https://parzibyte.me/blog/en/2019/10/13/a-plugin-for-printing-thermal-printers-from-browser/

const Cart = connect(state => ({
  services: state.wp.slotbyid.services,
  cart: state.ui.cart,
  order: state.ui.order
}))(props => { 

  const toggleCart = e => {

    e.stopPropagation()

    props.cart.openstate != 'wrapper' &&    
    props.dispatch(Actions.uiOpenCart())

    props.cart.openstate != 'hidden' &&    
    props.dispatch(Actions.uiCloseCart())
  }

  const selectStep = (e, key) => {

    e.stopPropagation()

    props.dispatch(Actions.uiSetCartStatus({
      actualstep: key 
    }))
  }

  const raciones = Object.keys(props.order.services)
  .reduce((count, key) => {

    return count + props.order.services[key]
  }, 0)
  
  return <div
    className={`
      Cart
      ${ props.cart.openstate }
    `}
  >
    <div className="Wrapper"> 
      <div className="Header">
        <div className="Title">
          Tu pedido
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
    </div>
    <div className="OpenCart">
      <Button
        icon={ <Icons.ShoppingCartOutlined /> }
        shape="circle"
        size="large"
        onClick={ toggleCart }
        disabled={ !Object.keys(props.order.services).length }
      />
      <div className="Count">
        { raciones } / {          
          Object.keys(props.order.services)
          .reduce((count, key) => {

            return count + (
              props.order.services[key]
              *
              parseFloat(props.services[key].servicebasic.price)
            )
          }, 0)
        } €
      </div>
    </div>
  </div>  
})

export default Cart