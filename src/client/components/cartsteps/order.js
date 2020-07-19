import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'
import { ServicesGroup } from './order/servicesgroup'
import { ToppingsList } from './order/toppingslist'
 
const Order = connect(state => ({
  services: state.wp.slotbyid.services,
  toppings: state.wp.slotbyid.toppings,
  cart: state.cart,
  order: state.order
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

    props.dispatch(Actions.cartSetStatus({
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
    {
      props.order.toppingsserviceid &&
      <ToppingsList />
    }
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