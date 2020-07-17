import React from 'react'

export const TopingsServices = props => {

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
  </div>
}