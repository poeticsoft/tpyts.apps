import React from 'react'
import { debounce } from 'lodash'
import { connect } from 'react-redux'
import { 
  Form, 
  Input, 
  DatePicker,
  Select, 
  AutoComplete,  
  Button,
  Tooltip
} from 'antd';
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const { Option } = Select;
const { TextArea } = Input;

const Location = connect(state => ({
  geo: state.geo,
  cart: state.ui.cart
}))(props => {   

  const goBack = e => {

    props.dispatch(Actions.uiSetCartStatus({
      actualstep: 'order'
    }))
  }

  const goWhere = e => {

    props.dispatch(Actions.uiSetCartStatus({
      actualstep: 'location'
    }))
  }

  const handleChange = value => {

    if(value.length > 4) { props.dispatch(Actions.geoAutocompleteAddress(value)) }
  }

  const onSelect = value => {

    props.dispatch(Actions.geoGetAddressToLocation(value))
  }

  return <div
    className={`
      Step
      Location
      ${ props.cart.actualstep == 'location' ? 'Visible' : '' }
    `}
  >
    <div className="Content">
      <Form>

        <div className="Field Name">
          <Form.Item>
            <Input
              id="name" 
              placeholder="Tu nombre y apellidos" 
              size="large"
            />
          </Form.Item>
        </div>

        <div className="Field Tel">
          <Form.Item>
            <Input
              id="tel" 
              placeholder="Tu teléfono" 
              size="large"
            />
          </Form.Item>
        </div>

        <div className="Field Mail">
          <Form.Item>
            <Input
              id="mail" 
              placeholder=" o tu mail" 
              size="large"
            />
          </Form.Item>
        </div>

        <div className="Field Location">
          <Form.Item
            hasFeedback          
            validateStatus={ props.geo.apistatus == 'ready' ? 'error' : 'validating'}
          >
            <AutoComplete
              options={ props.geo.autocompletepredictions }
              onSelect={ onSelect }
              onBlur={ e => onSelect(e.target.value) }
              onChange={ debounce(handleChange, 100) }
            >
              <Input 
                size="large" 
                placeholder="Tu dirección"
              />
            </AutoComplete>
          </Form.Item>          
          <div className="Check">
            <Button 
              shape="round"
              icon={ <Icons.EnvironmentOutlined /> }
              disabled
            >
              Comprueba tu localización
            </Button>
          </div>
        </div>

        <div className="Field WhenSelect">
          <Form.Item>
            <Select
              defaultValue="lap"
            >
              <Option value="lap">Lo antes posible</Option>
              <Option value="et" disabled>
                <Tooltip
                  title="(no disponible)"
                  trigger="click"
                >
                  Para esta tarde
                </Tooltip>
              </Option>
              <Option value="mnn">Para mañana</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="Field WhenPicker">
          <Form.Item>
            <DatePicker
              mode="time"
              placeholder="A que hora?"
              disabled
            />
          </Form.Item>
        </div>

        <div className="Field Comments">
          <Form.Item>
            <TextArea 
              placeholder="Comentarios?" 
              allowClear 
            />
          </Form.Item>
        </div>
      </Form>
    </div>
    <div className="Next">
      <Button 
        className="Back"
        shape="circle"
        icon={ <Icons.LeftOutlined /> }
        onClick={ goBack }
      />
      <div className="Text">
        Lo quiero!
      </div>
      <Button 
        shape="circle"
        icon={ <Icons.RightOutlined /> }
        onClick={ goWhere }
      />
    </div>
  </div>
})

export default Location