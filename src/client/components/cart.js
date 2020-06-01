import React, {
  useEffect,
  useState
} from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const Cart = connect(state => ({
  services: state.wp.slotbyid.services,
  order: state.ui.order
}))(props => {  

  const [ totalServices, setTotalServices ] = useState(0)
  const [ totalPrice, setTotalPrice ] = useState(0)
  const [ opened, setOpened ] = useState(false)

  useEffect(() => {

    setTotalServices(
      Object.values(props.order.services)
      .reduce((total, value) => (total + value ), 0)
    )
    
    setTotalPrice(
      Object.keys(props.order.services)
      .reduce((total, key) => {
        
        const keyPrice = parseFloat(props.services[key].servicebasic.price)
        const quantity = props.order.services[key]
        return total + (keyPrice * quantity)
      }, 0)
    )
  }, [
    props.order.services
  ])

  const openCart = e => {

    setOpened(!opened)
  }
  
  return <div
    className={`
      Cart
      ${ opened ? 'Opened' : '' }
    `}
  >
    <div className="Header">
      <div className="Servicios">
        <div className="Count">{ totalServices }</div>
        <div className="Text">Raciones</div>
      </div>
      <div className="Price">
        <div className="Number">{ totalPrice }</div>
        <div className="Currency">€</div>
      </div>
      <div className="Tools">
        <Button
          icon={ <Icons.ShoppingCartOutlined /> }
          shape="circle"
          onClick={ openCart }
          disabled={ totalPrice == 0 }
        />
      </div>
    </div>
    <div className="CartBody">
      
    </div>
  </div>
})

export default Cart