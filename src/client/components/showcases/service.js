import React from 'react'
import Quantity from '../common/quantity'

const Service = props => {
  
  return <div className="Service">

    <div
      className="Image"
      style={{
        backgroundImage: 'url(' + props.fullsize + ')'
      }}
    >
      <div className="Product">
        <span className="Title">{ props.post_title }</span>        
        <div className="Stock">
          <span className="Text">Quedan</span>
          <span className="Number">30</span>
          <span className="Text">raciones</span>
        </div>
      </div>
      <div className="Price">
        <span className="Number">{ props.servicebasic.price }</span>
        <span className="Currency">€</span>
      </div>
    </div>
    
    <Quantity 
      serviceid={ props.ID }
      dispatch={ props.dispatch }
    />

    <div className="Data">
      <div className="Excerpt">
        { props.post_excerpt }
      </div>
      <div 
        className="Components"
        dangerouslySetInnerHTML={{ __html: props.servicebasic.components }}
      />
      <div className="Allergens">
        <span className="Label">Alérgenos</span>
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
      </div>{
        props.servicebasic.comments &&
        <div
          className="Comments"
          dangerouslySetInnerHTML={{ __html: props.servicebasic.comments }}
        />
      }       
    </div>
  </div>
}

export default Service