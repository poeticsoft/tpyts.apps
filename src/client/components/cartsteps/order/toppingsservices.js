import React from 'react'
import {
  Button
} from 'antd'
import * as Actions from 'rdx/actions'
import * as Icons from '@ant-design/icons'

export const TopingsServices = props => {

  const removeService = (e, index) => {

    props.dispatch(Actions.orderRemoveService(index))
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
        {
          service.toppings.length ?
          <div 
            className="Toppings"
          >
            Toppings
          </div> 
          :
          <></>
        }
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
                service.complements.length ?
                'Más complementos?'
                :
                'Complementos?'
              }
            </div>       
            <Button 
              shape="circle"
              onClick={ showToppings }
            >
              <Icons.UnorderedListOutlined />
            </Button>
          </div>
        </div>
      </div>)
    }
  </div>
}