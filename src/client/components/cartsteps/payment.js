import React from 'react'
import { connect } from 'react-redux'
import Cards from 'react-credit-cards';
import * as CartUtils from 'utils/payment'
import { 
  Form, 
  Input, 
  DatePicker,
  Select, 
  AutoComplete,  
  Button
} from 'antd';
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const Payment = connect(state => ({
  cart: state.ui.cart
}))(props => {    

  const goBack = e => {

    props.dispatch(Actions.uiSetCartStatus({
      actualstep: 'location'
    }))
  }

  const handleInputFocus = e => {

    props.dispatch(Actions.uiSetCardData({ focus: e.target.name }))
  }

  const handleInputChange = ({ target }) => {

    if (target.name === "number") {

      target.value = CartUtils.formatCreditCardNumber(target.value);

    } else if (target.name === "expiry") {

      target.value = CartUtils.formatExpirationDate(target.value);

    } else if (target.name === "cvc") {

      target.value = CartUtils.formatCVC(target.value);
    }

    console.log(target.value)

    props.dispatch(Actions.uiSetCardData({ [target.name]: target.value }))
  };

  const onCancel = e => {

    props.dispatch(Actions.uiCartCancel())
  }

  const onPay = e => {

    props.dispatch(Actions.uiCartPay())
  }
  
  return <div 
    className={`
      Step
      Payment
      ${ props.cart.actualstep == 'payment' ? 'Visible' : '' }
    `}
  >  
    <div className="Content">
      <div className="Card">
        <Cards
          number={ props.cart.card.number }
          name={ props.cart.card.name }
          expiry={ props.cart.card.expiry }
          cvc={ props.cart.card.cvc }
          focused={ props.cart.card.focus }
          preview={ false }
        />      
      </div>
      <div className="Form">
        <Form>
          <div className="Field Number">
            <Form.Item>
              <Input
                type="tel"
                pattern="[\d| ]{16,22}"
                name="number"
                placeholder="Número Tarjeta" 
                size="large"
                required  
                value={ props.cart.card.number }
                onChange={ handleInputChange }
                onFocus={ handleInputFocus }
              />
            </Form.Item>
          </div>
          <div className="Field Name">
            <Form.Item>
              <Input
                type="text"
                name="name"
                placeholder="Nombre titular" 
                size="large"
                required 
                value={ props.cart.card.name } 
                onChange={ handleInputChange }
                onFocus={ handleInputFocus }
              />
            </Form.Item>
          </div>
          <div className="Field Expiry">
            <Form.Item>
              <Input
                type="tel"
                pattern="\d\d/\d\d"
                name="expiry"
                placeholder="Valida hasta" 
                size="large"
                required 
                value={ props.cart.card.expiry } 
                onChange={ handleInputChange }
                onFocus={ handleInputFocus }
              />
            </Form.Item>
          </div>
          <div className="Field CVC">
            <Form.Item>
              <Input
                type="tel"
                pattern="\d{3,4}"
                name="cvc"
                placeholder="CVC" 
                size="large"
                required 
                value={ props.cart.card.cvc } 
                onChange={ handleInputChange }
                onFocus={ handleInputFocus }
              />
            </Form.Item>
          </div>
          <div className="Field Pay">  
            <Button
              className="Go"
              size="large"
              type="primary"
              shape="round"
              icon={ <Icons.EuroOutlined /> }
              onClick={ onPay }
            >
              Pagar
            </Button>          
            <Button
              className="Cancel"
              size="large"
              type="primary"
              shape="circle"
              icon={ <Icons.CloseCircleOutlined /> }
              onClick={ onCancel }
            />
          </div>
          <div className="Field Log">  
            Log operations
          </div>
        </Form>
      </div>
    </div>
    <div className="Next">
      <Button 
        className="Back"
        shape="circle"
        icon={ <Icons.LeftOutlined /> }
        onClick={ goBack }
      />
    </div>
  </div>
})

export default Payment