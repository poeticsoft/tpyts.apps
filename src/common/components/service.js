import React, {
  useState
} from 'react'
import { connect } from 'react-redux'
import Pedir from '../../client/components/common/pedir'
import Highlighter from 'react-highlight-words'
import { Button } from 'antd'
import * as Icons from '@ant-design/icons'

const Service = connect(state => ({
  showcase: state.ui.showcase,
  search: state.ui.search,
  toppings: state.wp.slotbyid.toppings
}))(props => {

  const [ toppingsVisible, setToppingsVisible ] = useState(false)

  const closeToppings = e => {

    toppingsVisible &&
    setToppingsVisible(false)
  }
  
  return <div className="ServiceWrapper">
    <div
      className="Service"
      onClick={ closeToppings }
    >
      <div className="Show">
        <div
          className="Image"
          style={{
            backgroundImage: 'url(' + props.fullsize + ')'
          }}
        />
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
          (
            props.servicebasic.toppings &&
            props.servicebasic.toppings != '0' &&
            props.servicebasic.toppings.split('|').length
          ) ?
            <div className="Toppings">
              <div className="Text">
                Puedes añadir complementos opcionales a cualquiera de las raciones de tu pedido
              </div>
              <div className="What">
                <Button
                  shape="circle"
                  icon={ <Icons.QuestionOutlined /> }
                  onClick={ e => setToppingsVisible(!toppingsVisible ) }
                /> 
                {
                  toppingsVisible &&
                  <div className="ToppingList">
                    <div className="ListTitle">
                      Complementos
                    </div>
                    <div className="List">
                      {
                        props.servicebasic.toppings.split('|')
                        .map((toppingid, index) => <div
                          className="ToppingInfo"
                          key={ index }
                        >
                          <div className="ToppingTitle">{ props.toppings[toppingid].post_title }</div>
                          <div className="ToppingPrice">
                            <span className="Number">
                              { props.toppings[toppingid].toppingbasic.price }
                            </span>
                            <span className="Currency">
                              €
                            </span>
                          </div>
                        </div>)
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
            :
            <></>
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