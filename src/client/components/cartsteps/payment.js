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
  cart: state.cart,
  payment: state.payment
}))(props => {    

  const goBack = e => {

    props.dispatch(Actions.cartSetStatus({
      actualstep: 'location'
    }))
  }

  const handleInputFocus = e => {

    props.dispatch(Actions.paymentSetCardData({ focus: e.target.name }))
  }

  const handleInputChange = ({ target }) => {

    if (target.name === "number") {

      target.value = CartUtils.formatCreditCardNumber(target.value);

    } else if (target.name === "expiry") {

      target.value = CartUtils.formatExpirationDate(target.value);

    } else if (target.name === "cvc") {

      target.value = CartUtils.formatCVC(target.value);
    }

    props.dispatch(Actions.paymentSetCardData({ [target.name]: target.value }))
  };

  const onCancel = e => {

    // ??
  }

  const onPay = e => {

    props.dispatch(Actions.paymentPay())
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
          number={ props.payment.card.number }
          name={ props.payment.card.name }
          expiry={ props.payment.card.expiry }
          cvc={ props.payment.card.cvc }
          focused={ props.payment.card.focus }
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
                value={ props.payment.card.number }
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
                value={ props.payment.card.name } 
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
                value={ props.payment.card.expiry } 
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
                value={ props.payment.card.cvc } 
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