import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import { 
  Card,
  Tag,
  Button,
  Drawer
} from 'antd'
import dummy from 'assets/img/dummy.jpg'
import * as Icons from '@ant-design/icons'
import { Menu } from './menu'

const Shop = props => {

  const selectShop = e => {    

    e.stopPropagation(); 
    props.dispatch(Actions.uiSetShopActive(props.shopid))
  }

  return <div className="Shop">
    <Card 
      className="ShopCard"
      title={ props.name }
      size="small"
      extra={
        <Button
          size="small"
          onClick={ selectShop }
        >
          <Icons.ProfileOutlined />
          Pedir
        </Button>
      }
    >
      <div className="ShopLogo">
        <img src={ dummy } />
      </div>
      <div className="ShopData">
        <div className="Services">
          <Icons.ProfileOutlined />
          <span className="Count">{ props.services.length }</span>
          <span className="Legend">Services</span>
        </div>        
        <div className="Status">
          <Tag 
            color="green"
          >
            open
          </Tag>
        </div> 
      </div>
    </Card>
  </div>
}

export const Shops =  connect(state => ({
  shops: state.fb.shops,
  shopactive: state.ui.shopactive
}))(props => {

  const onClose = () => {

    props.dispatch(Actions.uiSetShopActive(null))
  }
  
  return <div id="Shops">
    <div className="List">
      {
        Object.keys(props.shops.data)
        .map(key => <Shop  
          key={ key }
          shopid={ key }
          { ...props.shops.data[key] } 
          dispatch={ props.dispatch }
        />)
      }
    </div>
    <Drawer
      title={ 
        props.shops.data[props.shopactive] ?
          props.shops.data[props.shopactive].name
          :
          ''
      }
      placement="right"
      closable={ true }
      onClose={ onClose }
      visible={ props.shopactive != null }
      width="90%"
      destroyOnClose={ true }
    >
      {
        props.shopactive &&
        <Menu />
      } 
    </Drawer>
  </div>
})