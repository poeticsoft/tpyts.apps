import React from 'react'
import { connect } from 'react-redux'
import Quantity from '../common/quantity'
import Highlighter from 'react-highlight-words'

const Service = connect(state => ({
  showcase: state.ui.showcase,
  search: state.ui.search
}))(props => {
  
  return <div
    className="ServiceWrapper"
  >
    <div
      className="Service"
      style={{
        width: props.width + 'px'
      }}
    >    
      <div
        className="Image"
        style={{
          backgroundImage: 'url(' + props.fullsize + ')'
        }}
      >
        <div className="Product">
          <div className="Title">{ props.post_title }</div>
        </div>
        <div className="Price">
          <span className="Number">{ props.servicebasic.price }</span>
          <span className="Currency">€</span>
        </div> 
      </div>
                     
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
            <div className="Excerpt">
              <Highlighter
                highlightClassName="SearchHighlight"
                searchWords={ props.search.text.split(' ') }
                autoEscape={true}
                textToHighlight={ props.post_excerpt }
              />
            </div>
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
            <div 
              className="Components"
            >
              <Highlighter
                highlightClassName="SearchHighlight"
                searchWords={ props.search.text.split(' ') }
                autoEscape={true}
                textToHighlight={ props.servicebasic.components }
              />
            </div>
            :
            <div 
              className="Components"
              dangerouslySetInnerHTML={{ __html: props.servicebasic.components }}
            />
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
          <div
            className="Comments"
            dangerouslySetInnerHTML={{ __html: props.servicebasic.comments }}
          />
        }       
      </div>
    </div>
  </div>
})

export default Service