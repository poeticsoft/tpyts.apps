import React from 'react'
import { connect } from 'react-redux'
import PedirQuitar from '../../common/pedirquitar'
import Pedir from '../../common/pedir'
import { TopingsServices } from './toppingsservices'

export const ServicesGroup = connect(state => ({
  services: state.wp.slotbyid.services,
  toppings: state.wp.slotbyid.toppings
}))(props => {

  const service = props.services[props.serviceid]
  const toppingsids = service.servicebasic.toppings &&
                      service.servicebasic.toppings.split('|')

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
    <div className="Data">
      <div className="Title">{ service.post_title }</div> 
      {
        toppingsids ? <>
          <div className="SelectToppings">
            Puedes seleccionar complementos para cada ración
          </div>
        </>
        :
        <PedirQuitar 
          serviceid={ props.serviceid }
          dispatch={ props.dispatch }
        /> 
      }
    </div>  
    {
      toppingsids ? <>  
        <div className="Services">
          <div className="Quantity">
            <span className="Number">
              { props.group.length}
            </span>
            <span className="Text">
              Raciones
            </span>
          </div>
          <Pedir 
            serviceid={ props.serviceid }
            dispatch={ props.dispatch }
          /> 
        </div>      
        <TopingsServices
          group={ props.group }
          dispatch={ props.dispatch }
        />
      </>
      :
      <></>
    }
  </div>
})