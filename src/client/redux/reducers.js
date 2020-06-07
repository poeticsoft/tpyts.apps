import { combineReducers } from 'redux';

import ui from './modules/ui/reducer'
import fb from './modules/fb/reducer'
import wp from './modules/wp/reducer'
import geo from './modules/geo/reducer'

const reducers = combineReducers({
  ui,
  fb,
  wp,
  geo
});

export default reducers;