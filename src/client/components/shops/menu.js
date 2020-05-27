import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import {
  Tag,
  Button,
  InputNumber,
  Drawer
} from 'antd'
import dummy from 'assets/img/dummy.jpg'
import * as Icons from '@ant-design/icons'

const Service = props => {

  const showService = e => {

    e.stopPropagation(); 
    props.dispatch(Actions.uiSetServiceActive(props.serviceid))
  }

  return <div className="Service">
    <div className="ServiceImage">
      <img src={ dummy } />
    </div>
    <div className="Name">
      { props.name }
    </div>
    <div className="Tools">
      <InputNumber
        className="Count"
        size="small"
        min={ 1 } max={ 6 } 
        defaultValue={ 1 }
      />
      <Button
        size="small"
      >
        <Icons.PlusCircleOutlined  />
      </Button>
      <Button
        size="small"
        onClick={ showService }
      >
        <Icons.BarsOutlined  />
      </Button>
    </div>
  </div>
}

export const Menu =  connect(state => ({
  shops: state.fb.shops,
  shopactive: state.ui.shopactive,
  services: state.fb.services
}))(props => {

  const onClose = () => {

    props.dispatch(Actions.uiSetServiceActive(null))
  }  
  
  return <div id="Menu">
    <div className="List">
      {
        Object.keys(props.services.data)
        .map(key => <Service
          key={ key }
          serviceid={ key }
          dispatch={ props.dispatch }
          { ...props.services.data[key] }
        />)
      }
    </div>
    <Drawer
      title={ 
        props.shops.data[props.serviceactive] ?
          props.shops.data[props.serviceactive].name
          :
          ''
      }
      placement='right'
      closable={ true }
      onClose={ onClose }
      visible={ props.serviceactive != null }
      width='30%'
      destroyOnClose={ true }
    >
      <p>Service...</p>
    </Drawer>
  </div>
})