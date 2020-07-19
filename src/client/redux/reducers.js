import { combineReducers } from 'redux';

import ui from './modules/ui/reducer'
import fb from './modules/fb/reducer'
import wp from './modules/wp/reducer'
import geo from './modules/geo/reducer'
import cart from './modules/cart/reducer'
import order from './modules/order/reducer'
import location from './modules/location/reducer'
import payment from './modules/payment/reducer'
import search from './modules/search/reducer'

const reducers = combineReducers({
  ui,
  fb,
  wp,
  geo,
  cart,
  order,
  location,
  payment,
  search
});

export default reducers;