import React, {
  useEffect,
  useState,
  createRef
} from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Carousel,
  Menu
} from 'antd'
import Order from './cart/order'
import Location from './cart/location'
import Payment from './cart/payment'
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'
import { PresetStatusColorTypes } from 'antd/lib/_util/colors'

// https://parzibyte.me/blog/en/2019/10/13/a-plugin-for-printing-thermal-printers-from-browser/

const steps = {
  'order': {
    index: 0,
    name: 'Pedido',
    comp: Order,
    icon: <Icons.UnorderedListOutlined />
  },
  'location': {
    index: 1,
    name: 'Donde?',
    comp: Location,
    icon: <Icons.EnvironmentOutlined />
  },
  'payment': {
    index: 2,
    name: 'Pago',
    comp: Payment,
    icon: <Icons.EuroOutlined />
  }
}

const Cart = connect(state => ({
  services: state.wp.slotbyid.services,
  order: state.ui.order
}))(props => { 
  
  const cartBodyRef = createRef()

  const [ totalServices, setTotalServices ] = useState(0)
  const [ totalPrice, setTotalPrice ] = useState(0)
  const [ opened, setOpened ] = useState(false)
  const [ step, setStep ] = useState('order')

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

  const selectStep = e => {

    setStep(e.key)
    cartBodyRef.current.goTo(steps[e.key].index)
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
      {
        opened &&
        <>
          <div className="Steps">
            <Menu
              onClick={ selectStep } 
              selectedKeys={[ step ]}
              mode="horizontal"
            >
              {
                Object.keys(steps)
                .map(key => <Menu.Item 
                  key={ key } 
                  icon={ steps[key].icon }
                >
                  { steps[key].name }
                </Menu.Item>
                )
              }
            </Menu>
          </div>  
          <div className="CartBody">
        <Carousel
          ref={ cartBodyRef }
        >
          {
            Object.keys(steps)
            .map(key => {

              const Comp = steps[key].comp

              return <Comp key={ key } />
            })
          }
        </Carousel>
      </div>
        </>
      }  
    </div>
})

export default Cart