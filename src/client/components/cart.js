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

const closeButtonIcons = {
  hidden: <Icons.ShoppingCartOutlined />,
  header: <Icons.SmileOutlined />,
  wrapper: <Icons.SmileOutlined />,
  visible: <Icons.CloseOutlined />
}

const Cart = connect(state => ({
  services: state.wp.slotbyid.services,
  cart: state.cart,
  order: state.order
}))(props => { 

  const toggleCart = e => {

    e.stopPropagation()

    props.cart.openstate != 'wrapper' &&    
    props.dispatch(Actions.cartOpen())

    props.cart.openstate != 'hidden' &&    
    props.dispatch(Actions.cartClose())
  }

  const selectStep = (e, key) => {

    e.stopPropagation()

    props.dispatch(Actions.cartSetStatus({
      actualstep: key 
    }))
  }

  const stepKeys = Object.keys(props.cart.steps)
  
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
          stepKeys
          .map((key, index) => <Fragment key={ key }>
            {
              index > 0 && <i></i>
            }
            <Button   
              icon={ props.cart.steps[key].icon }
              shape="round"
              type={ props.cart.actualstep == key ? 'primary' : '' }
              onClick={ e => selectStep(e, key)}
              disabled={ 
                index > 0 &&
                !props.cart.steps[stepKeys[index - 1]].valid 
              }
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
        icon={ closeButtonIcons[props.cart.openstate] }
        shape="circle"
        size="large"
        onClick={ toggleCart }
      />
      <div className="Count">
        { 
          props.order.services.length } / {          
          props.order.services
          .reduce((count, service) => {

            const price = props.services[service.serviceid].servicebasic.price ?
              parseFloat(props.services[service.serviceid].servicebasic.price.replace(',', '.'))
              :
              0

            return count + price
            
          }, 0).toFixed(2).replace('.', ',')
        } €
      </div>
    </div>
  </div>  
})

export default Cart