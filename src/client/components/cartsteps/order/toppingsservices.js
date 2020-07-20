import React from 'react'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'

export const TopingsServices = props => {
  
  const removeService = (e, index) => {

    props.dispatch(Actions.orderTryRemoveService(index))
  }

  const removeTopping = (e, serviceid, toppingid) => {

    
  }

  const showToppings = (e, serviceid) => {

    props.dispatch(Actions.orderServiceToppingsList(serviceid))
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
              onClick={ e => showToppings(e, service.serviceid ) }
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
              .map((toppingid, index) => <div className="Topping">
                <div className="Title">Topping title</div>                     
                <Button 
                  shape="circle"
                  onClick={ removeTopping }
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
}