import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import {
  Collapse,
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'
import Service from './service'

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

  return <div className="Cover">
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

const Stores = connect(state => ({
  stores: state.wp.slot.stores,
  services: state.wp.slot.services
}))(props => <div className="Stores">
    <Collapse
      bordered={ true }
      expandIconPosition="left"
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
          {
            props.services.data
            .filter(service => service.servicebasic.store == store.ID)
            .map(service => <Service
              key={ service.ID }
              dispatch={ props.dispatch }
              { ...service } 
            />)
          }
        </Panel>)
      }
    </Collapse>
  </div>
)

export default Stores