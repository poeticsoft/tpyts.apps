import React, {
  useEffect,
  useState
} from 'react'
import { 
  debounce, 
  times
} from 'lodash'
import { connect } from 'react-redux'
import { 
  Form, 
  Input, 
  TimePicker,
  Select, 
  AutoComplete,  
  Button
} from 'antd';
import * as Icons from '@ant-design/icons'
import * as Actions from 'rdx/actions'

const { Option } = Select;
const { TextArea } = Input;

const Location = connect(state => ({
  geo: state.geo,
  cart: state.cart,
  location: state.location
}))(props => {   

  const [ form ] = Form.useForm()
  const [ valid, setValid ] = useState()

  const startHour = 9
  const endHour = 22
  const nowHour = new Date().getHours()
  const invalidHours = times(24)
    .filter(hour => (hour < startHour || hour > endHour))
  const todayInvalidHours = times(24)
    .filter(hour => (hour <= nowHour || hour < startHour || hour > endHour))

  const goBack = e => {

    props.dispatch(Actions.cartSetStatus({
      actualstep: 'order'
    }))
  }

  const goPayment = e => {

    props.dispatch(Actions.cartSetStatus({
      actualstep: 'payment'
    }))
  }

  const onChangeAddress = debounce(value => {    

    if(value.length > 4) { 

      props.dispatch(Actions.geoSetStatus({
        predictionsstatus: 'validating'
      }))

      props.dispatch(Actions.geoAutocompleteAddress(value)) 

      form.validateFields()
    }
  }, 500);

  const onSelectAddress = value => {

    props.dispatch(Actions.geoSetStatus({
      predictionsstatus: 'success'
    }))

    props.dispatch(Actions.geoGetAddressToLocation())
  }

  const checkLocation = () => {

    props.dispatch(Actions.uiSetMapState({
      active: true,
      location: {
        lat: parseFloat(props.location.addresslocation.lat),
        lng: parseFloat(props.location.addresslocation.lng)
      },
      zoom: 17,
      data: {
        title: props.location.form.address
      },
      type: 'location'
    }))
  }  

  const valuesChange = (changedValues, allValues) => {

    props.dispatch(Actions.locationSet({ form: changedValues }))

    form.validateFields()
  }

  const whenChange = value => {

    props.dispatch(Actions.locationSet({ extra: { when: value } }))

    form.validateFields()
  }

  const timeChange = (moment, string) => {

    props.dispatch(Actions.locationSet({ extra: { time: moment } }))

    form.validateFields()
  }

  const commentsChange = value => {

    props.dispatch(Actions.locationSet({ extra: { comments: value } }))

    form.validateFields()
  }

  useEffect(() => {

    form.validateFields()
    .then(result => {

      const valid = (
        props.location.extra.when != null &&
        (
          props.location.extra.when == 'lap'
          ||
          (
            props.location.extra.when != 'lap' &&
            props.location.extra.time != null
          )
        ) 
      )

      props.dispatch(Actions.locationSet({
        valid: valid
      }))

      props.dispatch(Actions.cartSetStatus({
        steps: {
          location: {
            valid: valid
          }
        }
      }))
    })  
    .catch(error => {
      
      props.dispatch(Actions.locationSet({
        valid: false
      }))

      props.dispatch(Actions.cartSetStatus({
        steps: {
          location: {
            valid: false
          }
        }
      }))
    })

  }, [
    props.location.form.name,
    props.location.form.tel,
    props.location.form.address,
    props.location.extra.when,
    props.location.extra.time
  ])

  return <div
    className={`
      Step
      Location
      ${ props.cart.actualstep == 'location' ? 'Visible' : '' }
    `}
  >
    <div className="Content">

      <Form
        form={ form }
        onValuesChange={ valuesChange }
        fields={ 
          Object.keys(props.location.form)
          .filter(key => key != 'geo')
          .map(key => ({
            name: [key],
            value: props.location.form[key]
          }))
        }
      >

        <div className="Field Name">
          <Form.Item
            name="name"
            rules={
              [
                { 
                  required: true,
                  message: 'Necesitamos un nombre para dirigirnos a ti!' 
                }
              ]
            }
          >
            <Input 
              placeholder="Tu nombre y apellidos"
            />
          </Form.Item>
        </div>

        <div className="Field Tel">
          <Form.Item
            name="tel"
            rules={
              [
                {
                  required: true,
                  len: 9,
                  message: 'Necesitamos un teléfono válido!',
                }
              ]
            } 
          >
            <Input
              placeholder="Tu teléfono" 
              addonBefore="+34" 
            />
          </Form.Item>
        </div>

        <div className="Field Location">          
          <Form.Item
            name="address"
            hasFeedback          
            validateStatus={ props.geo.predictionsstatus }
            rules={
              [
                {
                  required: true,
                  message: 'Necesitamos la dirección de entrega!',
                }
              ]
            } 
          >
            <AutoComplete
              options={ props.geo.autocompletepredictions }
              onSelect={ onSelectAddress }
            >
              <Input 
                placeholder="Dirección de entrega"
                onChange={({ target: { value } }) => onChangeAddress(value)}
              />
            </AutoComplete>
          </Form.Item> 
          
          <div
            className="GeoLocation"
          >            
            {
              props.location.addresstolocationstatus == 'ok' ?
                <div className="CheckLocation">
                  <Button 
                    shape="round"
                    icon={ <Icons.EnvironmentOutlined /> }
                    onClick={ checkLocation }
                  >
                    Comprueba tu localización
                  </Button>
                </div>
                :
                props.location.addresstolocationstatus == 'searching' ?
                  <div 
                    className="SearchingLocation"
                  >
                    Buscando tu localización en el mapa
                  </div>
                  :
                  <div 
                    className="NoLocation"
                  >
                    No hemos encontrado tu localización en el mapa
                  </div>
            }
          </div>
        </div>

        <div className="Field WhenSelect">
          <div className="ant-row ant-form-item">
            <div className="ant-col ant-form-item-control">
              <Select          
                value={ props.location.extra.when }
                onChange={ whenChange }
                placeholder="Cuando lo quieres?"
              >
                <Option value="lap">Lo antes posible</Option>
                <Option value="h">Hoy</Option>
                <Option value="mnn">Mañana</Option>
              </Select>
            </div>
          </div>
        </div>

        <div className="Field WhenPicker">
          <div className="ant-row ant-form-item">
            <div className="ant-col ant-form-item-control">
              <TimePicker
                className="WhenTime"
                mode="time"
                placeholder="Hora?"
                minuteStep={ 15 }
                showNow={ false }
                disabled={                  
                  !props.location.extra.when
                  ||
                  props.location.extra.when == 'lap'
                }
                value={ props.location.extra.time }
                onChange={ timeChange }
                disabledHours={ () => {
                  
                  if(props.location.extra.when == 'h') { return todayInvalidHours }
                  if(props.location.extra.when == 'mnn') { return invalidHours }
                  return []
                }}
                hideDisabledOptions={ true }
              />
            </div>
          </div>
        </div>

        <div className="Field Comments">
          <div className="ant-row ant-form-item">
            <div className="ant-col ant-form-item-control">
              <TextArea 
                placeholder="Comentarios?" 
                allowClear 
                value={ props.location.extra.comments }
                onChange={ commentsChange }
              />
            </div>
          </div>
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
      {
        props.location.valid ?
        <>
          <div className="Text">
            Lo quiero!
          </div>
          <Button 
            shape="circle"
            icon={ <Icons.RightOutlined /> }
            onClick={ goPayment }
          />
        </>
        :
        <></>
      }
    </div>
  </div>
})

export default Location