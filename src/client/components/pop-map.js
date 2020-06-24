import React from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react';
import * as Actions from 'rdx/actions'
import { GMaps } from 'utils/config'
import {
  Button
} from 'antd'
import * as Icons from '@ant-design/icons'

const Target = props => <div className="Target">
  <Icons.ShopOutlined />
</div>;

const PopMap = connect(state => ({ 
  map: state.ui.map
}))(props => {

  const handleApiLoaded = (map, maps) => {

    google.maps.event.addListenerOnce(
      map, 
      'tilesloaded', 
      () => props.dispatch(Actions.uiSetMessage({
        text: 'Map ready'
      }))
    )

    map.setCenter(props.map.location)
  }

  const closeMap = e => {

    e.stopPropagation()

    props.dispatch(Actions.uiSetMapState({
      active: false
    }))
  }

  return props.map.active &&
  <div 
    className="PopMap"
  >
    <div className="Wrapper">
      <div className="Header">
        <div className="Text">
          { props.map.data.title }
        </div>
        <div className="Tools">
          <Button
            shape="circle"
            icon={ <Icons.CheckOutlined /> } 
            onClick={ closeMap }
          />
        </div>        
      </div>
      <div className="Google">      
        <GoogleMapReact
          bootstrapURLKeys={{ key: GMaps.key }}
          center={ props.map.location }
          zoom={ props.map.zoom }
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <Target
            lat={ props.map.location.lat }
            lng={ props.map.location.lng }
            name={ props.map.data.title }
          />
        </GoogleMapReact>
      </div>
    </div>
  </div>
})

export default PopMap;
