import React from 'react'
import { connect } from 'react-redux'
import PedirQuitar from '../../common/pedirquitar'
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
      />
      :
      <></>
    }
  </div>
})