import React, {
  useState
} from 'react'
import { connect } from 'react-redux'
import Pedir from '../common/pedir'
import Highlighter from 'react-highlight-words'
import * as Actions from 'rdx/actions'
import VisibilitySensor from 'react-visibility-sensor'

const ServiceResume = connect(state => ({
  showcase: state.ui.showcase,
  search: state.ui.search
}))(props => {

  const [ visible, setVisible ] = useState(false)

  const amIVisible = iAmVisible => {

    setVisible(iAmVisible || visible)
  }

  const moreInfo = e => {

    e.stopPropagation()

    props.dispatch(Actions.uiSetServiceInfoState({
      serviceid: props.ID,
      active: true
    }))
  }
  
  return <div
    className="ServiceResumeWrapper"
  >
    <div className="Service"> 
      <VisibilitySensor 
        onChange={ amIVisible }
        partialVisibility
      > 
        <div className="Show">
          {
            visible &&
            <div
              className="Image"
              style={{
                backgroundImage: 'url(' + props.fullsize + ')'
              }}
            />
          }
          <div className="Product">
            {
              props.showcase == 'search' ?
              <Highlighter
                className="Title"
                highlightClassName="SearchHighlight"
                searchWords={ props.search.text.split(' ') }
                autoEscape={ true }
                textToHighlight={ props.post_title }
              />
              :
              <div className="Title">{ props.post_title }</div>
            }
            {
              (
                props.servicebasic.toppings &&
                props.servicebasic.toppings.split('|').length
              ) ?
                <div className="HaveVariations">
                  Admite variaciones
                </div>
                :
                <></>
            }
          </div>
          <div className="Price">
            <span className="Number">{ props.servicebasic.price || 0 }</span>
            <span className="Currency">€</span>
          </div> 
        </div>
      </VisibilitySensor  >                     
      <div className="Stock">
        <span className="Text">Quedan</span>
        <span className="Number">30</span>
        <span className="Text">raciones</span>
      </div>
      
      <Pedir 
        serviceid={ props.ID }
        dispatch={ props.dispatch }
      />
      
      <div className="Data">
        <div className="Excerpt">
          { props.post_excerpt || '' }
        </div>
      </div>

      <div
        className="MoreInfo"
        onClick={ moreInfo }
      >
        + info
      </div>
    </div>
  </div>
})

export default ServiceResume