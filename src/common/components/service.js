import React, {
  useState
} from 'react'
import { connect } from 'react-redux'
import Quantity from '../../client/components/common/quantity'
import Highlighter from 'react-highlight-words'
import VisibilitySensor from 'react-visibility-sensor'

const Service = connect(state => ({
  showcase: state.ui.showcase,
  search: state.ui.search
}))(props => {  

  const [ visible, setVisible ] = useState(false) 
  
  return <div className="ServiceWrapper">
    <div className="Service"> 
      <VisibilitySensor 
        onChange={ setVisible }
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
              <div className="Title">
                { props.post_title }
              </div>
            }
          </div>
          <div className="Price">
            <span className="Number">{ props.servicebasic.price || 0 }</span>
            <span className="Currency">€</span>
          </div> 
        </div>        
      </VisibilitySensor>  
                     
      <div className="Stock">
        <span className="Text">Quedan</span>
        <span className="Number">30</span>
        <span className="Text">raciones</span>
      </div>
      
      <Quantity 
        serviceid={ props.ID }
        dispatch={ props.dispatch }
      />
      
      <div className="Data">
        {
          props.post_excerpt &&  
          (
            props.showcase == 'search' ?
            <Highlighter
              className="Excerpt"
              highlightClassName="SearchHighlight"
              searchWords={ props.search.text.split(' ') }
              autoEscape={ true }
              textToHighlight={ props.post_excerpt }
            />
            :
            <div className="Excerpt">
              { props.post_excerpt }
            </div>
          )
        }
        {
          props.servicebasic.components &&  
          (
            props.showcase == 'search' ?
            <Highlighter
              className="Components"
              highlightClassName="SearchHighlight"
              searchWords={ props.search.text.split(' ') }
              autoEscape={ true }
              textToHighlight={ props.servicebasic.components }
            />
            :
            <div className="Components">{ props.servicebasic.components }</div>
          )
        }
        {
          props.servicebasic.allergens &&
          <div className="Allergens">
            <div className="Label">Alérgenos</div>
            { 
              props.servicebasic.allergens
              .split('|')
              .map((allergen, index) => <span
                key={ index }
                className={`
                  Allergen
                  A_${ allergen }
                `}
              />)
            }
          </div>        
        }
        {
          props.servicebasic.comments &&  
          (
            props.showcase == 'search' ?
            <Highlighter
              className="Comments"
              highlightClassName="SearchHighlight"
              searchWords={ props.search.text.split(' ') }
              autoEscape={ true }
              textToHighlight={ props.servicebasic.comments }
            />
            :
            <div className="Comments">{ props.servicebasic.comments }</div>
          )
        } 
      </div>
    </div>
  </div>
})

export default Service