import React from 'react'
import { connect } from 'react-redux'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'

export const TopingsServices = connect(state => ({
  toppings: state.wp.slotbyid.toppings
}))(props => {
  
  const removeService = (e, index) => {

    props.dispatch(Actions.orderTryRemoveService(index))
  }

  const removeTopping = (e, serviceindex, toppingid) => {

    props.dispatch(Actions.orderServiceRemoveTopping({
      serviceindex: serviceindex,
      toppingid: toppingid
    }))
  }

  const showToppings = (e, serviceindex) => {

    props.dispatch(Actions.orderServiceToppingsList(serviceindex))
  }

  return <div 
    className="ToppingsServices"
  >
    {
      props.group
      .map((service, index) => <div
        className="ToppingsService"
        key={ index }
      >
        <div className="Tools">
          <div className="RemoveService">       
            <Button 
              shape="circle"
              onClick={ e => removeService(e, index) }
            >
              <Icons.CloseOutlined />
            </Button>
          </div>
          <div className="ShowToppings">
            <div className="Text">
              {
                service.toppings.length ?
                'Más complementos?'
                :
                'Complementos?'
              }
            </div>       
            <Button 
              shape="circle"
              onClick={ e => showToppings(e, service.index ) }
            >
              <Icons.UnorderedListOutlined />
            </Button>
          </div>
        </div>
        {
          (
            service.toppings &&
            service.toppings.length
          ) ?
          <div 
            className="Toppings"
          >
            {
              service.toppings
              .map((toppingid, index) => <div
                key={ index }
                className="Topping"
              >
                <div className="Title">
                  { props.toppings[toppingid].post_title }
                </div>                     
                <Button 
                  shape="circle"
                  onClick={ e => removeTopping(e, service.index, toppingid) }
                >
                  <Icons.CloseOutlined />
                </Button>
              </div>)
            }
          </div> 
          :
          <></>
        }
      </div>)
    }
  </div>
})