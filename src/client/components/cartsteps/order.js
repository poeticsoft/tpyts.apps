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

  const closeCart = e => props.dispatch(Actions.cartClose())

  const removeService = (e, index) => props.dispatch(Actions.orderRemoveService(index))
  const cancelRemoveService = e => props.dispatch(Actions.orderTryRemoveService(null))
  
  return <div 
    className={`
      Step
      Order
      ${ props.cart.actualstep == 'order' ? 'Visible' : '' }
    `}
  >
    <div className="Content">        
      {
        Object.keys(orderServiceGroups).length ?
        Object.keys(orderServiceGroups)
        .map(key => <ServicesGroup
          key={ key }
          serviceid={ key }
          group={ orderServiceGroups[key] }
        />)
        :
        <div className="NoServices">
          <div className="Text">
            Nada seleccionado
          </div>
          <Button
            shape="round"
            onClick={ closeCart }
          >
            Cerrar
          </Button>
        </div>        
      }
    </div>     
    {
      props.order.confirmremoveindex != null ?
      <div className="ConfirmRemove">
        <div className="Text">
          Cancelamos la ración?
        </div>
        <div className="Options">
          <Button
            shape="round"
            onClick={ e => removeService(e, props.order.confirmremoveindex) }
          >
            Si
          </Button>
          <Button
            shape="round"
            onClick={ cancelRemoveService }
          >
            No
          </Button>
        </div>
      </div>
      :
      <></>
    }   
    {
      (
        props.order.toppingsserviceindex
        || 
        props.order.toppingsserviceindex == 0
      ) &&
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
            
            service.toppings &&
            service.toppings &&
            service.toppings
            .forEach(toppingid => {
              
              const toppingprice = props.toppings[toppingid].toppingbasic.price ?
                parseFloat(props.toppings[toppingid].toppingbasic.price.replace(',', '.'))
                :
                0
              
              count += toppingprice              
            })

            return count + price

          }, 0).toFixed(2).replace('.', ',')
        }
      </div>
      <div className="Currency">
        €
      </div>
    </div>
    <div className="Next">
      {
        (
          props.order.services &&
          props.order.services.length
        ) ? <>
          <div className="Text">
            Donde lo llevamos?
          </div>
          <Button 
            shape="circle"
            icon={ <Icons.RightOutlined /> }
            onClick={ goWhere }
          />
        </>
        :
        <></>
      }      
    </div>
  </div>
})

export default Order