import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import Service from 'common/components/service'

const PopService = connect(state => ({ 
  serviceinfo: state.ui.serviceinfo,
  services: state.wp.slotbyid.services
}))(props => {

  const closeService = e => {

    e.stopPropagation()

    props.dispatch(Actions.uiSetServiceInfoState({
      active: false
    }))
  }

  return (
    props.services &&
    props.serviceinfo.active &&
    props.serviceinfo.serviceid
  ) ? 
  <div 
    className="PopService"
  >
    <div className="Wrapper">
      <Service { ...props.services[props.serviceinfo.serviceid] } />
      <div className="Tools">
        <Button
          shape="circle"
          icon={ <Icons.CheckOutlined /> } 
          onClick={ closeService }
        />
      </div> 
    </div>
  </div>
  :
  <></>
})

export default PopService;
