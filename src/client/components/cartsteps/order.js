import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'
import { ServicesGroup } from './orderservicesgroup'
 
const Order = connect(state => ({
  services: state.wp.slotbyid.services,
  cart: state.ui.cart,
  order: state.ui.order,
  toppings: state.wp.slotbyid.toppings
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
    {
      props.order.toppings.visible &&
      <div className="ToppingList">
        <div className="Wrapper">
          <div className="Choose">
            <div className="ListTitle">
              Elige complememtos
            </div>
            <Button 
              shape="circle"
              icon={ <Icons.RightOutlined /> }
              onClick={ SelectComplements }
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