import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'rdx/actions'
import {
  Button,
  Carousel 
} from 'antd'
import * as Icons from '@ant-design/icons'

const Gallery = connect(state => ({ 
  gallery: state.ui.gallery
}))(props => {

  const closeGallery = e => {

    e.stopPropagation()

    props.dispatch(Actions.uiSetGalleryState({
      active: false
    }))
  }

  return (
    props.gallery.active &&
    props.gallery.slides &&
    props.gallery.slides.length
  ) ?
    <div 
      className="Gallery"
    >
      <div className="Wrapper">
        <div className="Header">
          <div className="Text">
            { props.gallery.data.title }
          </div>
          <div className="Tools">
            <Button
              type="primary"
              shape="circle"
              icon={ <Icons.CheckCircleOutlined /> } 
              onClick={ closeGallery }
            />
          </div>        
        </div>
        <div className="Carousel">
          <Carousel
            autoplay
            arrows={ true }
            autoplaySpeed={ 3000 }
          >
            {
              props.gallery.slides
              .map((slide, index) => <div
                key={ index }
                className="Slide">
                <div
                  className="Image"
                  style={{
                    backgroundImage: 'url(' + slide.src + ')'
                  }}/>
              </div>)
            }
          </Carousel>
        </div>
        {
          props.gallery.data.info &&
          <div
            className="Info"
            dangerouslySetInnerHTML={{ __html: props.gallery.data.info }}
          />
        }
      </div>
    </div>
    :
    <></>
})

export default Gallery;
