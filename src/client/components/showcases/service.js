import React from 'react'
import Quantity from '../common/quantity'

const Service = props => {
  
  return <div className="Service">
    <div
      className="Image"
      style={{
        backgroundImage: 'url(' + props.fullsize + ')'
      }}
    ></div>
    <div className="Data">
      <div className="Name">
        { props.post_title }
      </div>
      <div className="Excerpt">
        { props.post_excerpt }
      </div>
      <div 
        className="Components"
        dangerouslySetInnerHTML={{ __html: props.servicebasic.components }}
      />
      <div className="Allergens">
        { 
          props.servicebasic.allergens
          .split('|')
          .map((allergen, index) => <div
            key={ index }
            className={`
              Allergen
              A_${ allergen }
            `}
          />)
        }
      </div>
      <div className="Price">
        <div
          className="Comments"
          dangerouslySetInnerHTML={{ __html: props.servicebasic.comments }}
        />
        <div className="NumberCurrency">
          <span className="Number">{ props.servicebasic.price }</span>
          <span className="Currency">€</span>
        </div>
      </div>
      <Quantity 
        serviceid={ props.ID }
        dispatch={ props.dispatch }
      />
    </div>
  </div>
}

export default Service