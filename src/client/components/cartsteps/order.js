import React, {
  useState
} from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'
import PedirQuitar from '../common/pedirquitar'

const TopingsServices = connect(state => ({
  toppings: state.wp.slotbyid.toppings
}))( props => {

  return <div 
    className="ToppingsServices"
  >
    {
      props.group
      .map((service, index) => <div
        className="ToppingsService"
        key={ index }
      >
        {
          service.complements.length ?
          <div 
            className="Toppings"
          >
            Toppings
          </div> 
          :
          <></>
        }
        <div className="AddTopping">
          <div className="Text">
            {
              service.complements.length ?
              'Más complementos?'
              :
              'Complementos?'
            }
          </div>       
          <Button 
            shape="circle"
            onClick={ props.showtoppings }
          >
            <Icons.UnorderedListOutlined />
          </Button>
        </div>
      </div>)
    }
    {
      true &&
      <div className="ToppingList">
        <div className="ListTitle">
          Complementos
        </div>
        <div className="List">
          {
            props.toppingsids
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
    }
  </div>
})

const ServicesGroup = connect(state => ({
  services: state.wp.slotbyid.services,
  toppings: state.wp.slotbyid.toppings
}))(props => {

  const service = props.services[props.serviceid]
  const toppingsids = service.servicebasic.toppings &&
                      service.servicebasic.toppings.split('|')

  const showToppings = e => {

  }

  return <div 
    className={`
      ServicesGroup
    `}
  >
    <div 
      className="Image"
      style={{
        backgroundImage: 'url(' + service.thumbnail + ')'
      }}
    />
    {
      toppingsids &&
      toppingsids.length &&
      <div className="Quantity">
        { props.group.length}
      </div>
    }
    <div className="Data">
      <div className="Title">{ service.post_title }</div> 
      {
        toppingsids ?
        <div className="SelectToppings">
          Puedes seleccionar complementos para cada ración
        </div>
        :
        <PedirQuitar 
          serviceid={ props.serviceid }
          dispatch={ props.dispatch }
        /> 
      }
    </div>  
    {
      toppingsids ?         
      <TopingsServices
        group={ props.group }
        showtoppings={ showToppings }
        toppingsids={ toppingsids }
      />
      :
      <></>
    }
  </div>
})

const Order = connect(state => ({
  services: state.wp.slotbyid.services,
  cart: state.ui.cart,
  order: state.ui.order,
}))(props => { 

  const orderServiceGroups = props.order.services
  .reduce((groups, service, index) => {

    const serviceid = service.serviceid
    service.index = index
    groups[serviceid] ? 
      groups[serviceid].push(service)
      :
      groups[serviceid] = [service]

    return groups
  }, {});

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
        Object.keys(orderServiceGroups)
        .map(key => <ServicesGroup
          key={ key }
          serviceid={ key }
          group={ orderServiceGroups[key] }
        />)
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