import React, {
  useState,
  useEffect
} from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import {
  Collapse,
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import { Scrollbar } from 'react-scrollbars-custom'
import ServiceResume from './service-resume'

const { Panel } = Collapse

const StoreCover = props => {

  const showMap = e => {

    e.stopPropagation()

    props.dispatch(Actions.uiSetMapState({
      active: true,
      location: {
        lat: parseFloat(props.storebasic.latitude),
        lng: parseFloat(props.storebasic.longitude)
      },
      zoom: 17,
      data: {
        title: props.post_title
      }
    }))
  }  

  const showGallery = e => {

    e.stopPropagation()

    const galleryData = {
      active: true,
      slides: props.gallery.map(slide => ({ src: slide })),
      data: { 
        title: props.post_title,
        info: props.storebasic.info
      }
    }

    props.dispatch(Actions.uiSetGalleryState(galleryData))    
  }

  const style = (
    props.gallery
    &&
    props.gallery[0]
  ) ? {
    backgroundImage: 'url(' + props.gallery[0] + ')'
  }
  :
  {}

  return <div
    className="Cover"
    style={ style }
  >
    <div
      className="Logo"
      style={{
        backgroundImage: 'url(' + props.thumbnail + ')'
      }}
    />
    <div className="Data">
      <div className="Info">
        <div className="Title">{ props.post_title }</div>
        <div className="Excerpt">{ props.post_excerpt }</div>
      </div>
      <div className="Address">
        <Button 
          shape="circle"
          icon={<Icons.EnvironmentOutlined />}
          onClick={ showMap }
        />
        <div className="Texts">        
          <div className="AddressStreet">{ props.storebasic.addressstreet }</div>
          <div className="AddressNumber">{ props.storebasic.addressnumber }</div>
          <div className="Location">{ props.storebasic.location }</div>
        </div>
      </div>
    </div>
    <div className="Tools">
      <Button
        shape="round"
        onClick={ showGallery }
      >
        <Icons.FileImageOutlined />
        <span>Galería</span>
      </Button>
    </div>
  </div>
}

const ServicesList = connect(state => ({
  window: state.ui.window
}))(props => {
  
  return <div 
    className={`
      ServicesWrapper
    `}
  > 
    {
      props.services
      .map(service => <ServiceResume
        key={ service.ID }
        dispatch={ props.dispatch }
        { ...service }
      />)
    }
  </div>
})

const Stores = connect(state => ({
  storesactive: state.ui.stores.storesactive,
  stores: state.wp.slot.stores,
  services: state.wp.slot.services
}))(props => {  

  const onChange = data => {

    props.dispatch(Actions.uiSetStoresActive(data))
  }

  return <div className="Stores">
    <Scrollbar 
      noScrollX
      style={{ 
        width: '100%', 
        height: '100%'
      }}> 
      {
        props.stores.data &&
        props.stores.data.length &&
        <Collapse
          bordered={ true }
          expandIconPosition="left"
          defaultActiveKey={ props.storesactive }
          onChange={ onChange }
        >
          {
            props.stores.data
            .map(store => <Panel
              key={ store.ID }
              storeid={ store.ID }
              header={ <StoreCover 
                dispatch={ props.dispatch }
                { ...store }
              />}
            >
              <Scrollbar 
                noScrollY
                style={{ 
                  width: '100%', 
                  height: 270 
                }}>              
                <ServicesList
                  services={
                    props.services.data
                    .filter(service => service.servicebasic.store == store.ID)
                  }
                />      
              </Scrollbar>
            </Panel>)
          }
        </Collapse>
      }
    </Scrollbar>
  </div>
})

export default Stores