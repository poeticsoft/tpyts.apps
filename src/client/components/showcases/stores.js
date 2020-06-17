import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import { debounce } from 'lodash'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import Draggable from 'react-draggable'
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
}))(props => {

  const [ dragBound, setDragBound ] = useState(0)
  const bounds = useRef()

  const resize = debounce(() => {

    console.log(bounds.current.childNodes[0].name)

    setDragBound(bounds.current.innerWidth + window.innerWidth)
  })

  useEffect(() => {

    window.addEventListener('resize', resize)

    resize()

    return () => window.removeEventListener('resize', resize)
  })
  return <div className="Stores">
    {
      props.stores.data &&
      props.stores.data.length &&
      <Collapse
        bordered={ true }
        expandIconPosition="left"
        defaultActiveKey={ [ props.stores.data[0].ID] }
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
            <Draggable 
              axis="x" 
              bounds={{
                left: -dragBound,
                right: 0
              }}
            >
              <div 
                className="Services"
                ref={ bounds }
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
              </div>
            </Draggable>
          </Panel>)
        }
      </Collapse>
    }
  </div>
})

export default Stores